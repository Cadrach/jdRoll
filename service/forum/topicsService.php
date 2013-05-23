<?php

class TopicService {

	private $db;
	private $session;
	private $logger;

	public function __construct($db, $session, $logger)
    {
        $this->db = $db;
        $this->session = $session;
        $this->logger = $logger;
    }
    
    public function getBlankTopic($section_id) {
		$section = array();
		$section['id'] = '';
		$section['section_id'] = $section_id;
		$section['title'] = '';
		$section['ordre'] = '';
		$section['stickable'] = '0';
		$section['is_closed'] = '0';
		$section['is_private'] = '0';
		return $section;
    }

    public function getFormTopic($request) {
		$section = array();
		$section['id'] = $request->get('id');
		$section['section_id'] = $request->get('section_id');
		$section['title'] = $request->get('title');
		$section['ordre'] = $request->get('ordre');
		$section['stickable'] = $request->get('stickable');
		$section['is_closed'] = $request->get('is_closed');
		$section['is_private'] = $request->get('is_private');
		return $section;
    }

    public function getTopic($topic_id) {
    	$sql = "SELECT * FROM topics
				WHERE id = :topic";
    
    	return $this->db->fetchAssoc($sql, array("topic" => $topic_id));
    }
    
    public function createTopic($request) {	
		$sql = "INSERT INTO topics 
				(section_id, title, ordre, stickable, is_closed, is_private) 
				VALUES
				(:section,:title,:ordre,:stickable, :is_closed, :is_private)";

		$stmt = $this->db->prepare($sql);
		$stmt->bindValue("section", $request->get('section_id'));
		$stmt->bindValue("title", $request->get('title'));
		$stmt->bindValue("ordre", $request->get('ordre'));
		$stmt->bindValue("stickable", $request->get('stickable'));
		$stmt->bindValue("is_closed", $request->get('is_closed'));
		$stmt->execute();
    }

    public function updateTopic($request) {
    	$sql = "UPDATE topics 
    			SET title = :title,
    				ordre = :ordre,
    				stickable = :stickable,
    				is_closed = :is_closed,
    				is_private = :is_private
    			WHERE
    				id = :id";

		$stmt = $this->db->prepare($sql);
		$stmt->bindValue("title", $request->get('title'));
		$stmt->bindValue("ordre", $request->get('ordre'));
		$stmt->bindValue("stickable", $request->get('stickable'));
		$stmt->bindValue("is_closed", $request->get('is_closed'));
		$stmt->bindValue("is_private", $request->get('is_private'));
		$stmt->bindValue("id", $request->get('id'));
		$stmt->execute();
    }
    
    public function updateCanRead($topic_id, $request) {
    	
    	$sql = "DELETE FROM can_read 
    			WHERE
    				topic_id = :topic";

		$stmt = $this->db->prepare($sql);
		$stmt->bindValue("topic", $topic_id);
		$stmt->execute();
    	foreach($request->get('list_user') as $user) {
    		$this->logger->addInfo("Update can read : " . $user);
			$sql = "INSERT INTO can_read
					(topic_id, user_id)
					VALUES
					(:topic,:user)";
			
			$stmt = $this->db->prepare($sql);
			$stmt->bindValue("topic", $topic_id);
			$stmt->bindValue("user", $user);
			$stmt->execute();
    	}
    }
    
    public function updateLastPost($topic_id, $post_id) {
    	$sql = "UPDATE topics
    			SET last_post_id = :post
    			WHERE
    				id = :id";
    	
    	$stmt = $this->db->prepare($sql);
    	$stmt->bindValue("post", $post_id);
    	$stmt->bindValue("id", $topic_id);
    	$stmt->execute();
    }

    public function backwardLastPost($topic_id, $post_id) {
    	$sql = "UPDATE topics
    			SET last_post_id = (
					SELECT max(id)
					FROM posts
					WHERE topic_id = :id
    				AND last_post_id <> :post
    			)
    			WHERE
    				id = :id";
    	 
    	$stmt = $this->db->prepare($sql);
    	$stmt->bindValue("post", $post_id);
    	$stmt->bindValue("id", $topic_id);
    	$stmt->execute();
    }
    
}
?>