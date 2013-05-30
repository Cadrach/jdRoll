<?php

class ChatService {

	private $db;
	private $session;

	public function __construct($db, $session)
    {
        $this->db = $db;
        $this->session = $session;
    }
    
    public function getLastMsg() {
    	$sql = "SELECT * 
    			FROM chat
    			ORDER BY time ASC 
    			LIMIT 0, 100";
    	return $this->db->fetchAll($sql);
    }
    
    public function postMsg($user, $text) {
    	$sql = "INSERT INTO chat
    			(message, username) 
    			VALUES (:message, :user) ";
    	
    	$stmt = $this->db->prepare($sql);
    	$stmt->bindValue("message", $text);
    	$stmt->bindValue("user", $user);
    	$stmt->execute();
    }

    
}
?>