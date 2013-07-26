<?php

/**
 * Description of dicer
 *
 * @author zuberl
 */
class Dicer {
    var $elements = array();

    public function parse($expression) {
        $this->elements = array();
        $this->parseGroup($expression);
        $this->launch();
        return $this->toString();
    }

    private function parseGroup($expression) {
        $groupElt = explode("+", $expression);
        if(count($groupElt) == 1) {
            $group = $this->parseDicesExpression($expression);
            $this->elements[count($this->elements)] = $group;
        } else {
            $group = new Group("+");
            foreach($groupElt as $elt) {
                $result = $this->parseDicesExpression($elt);
                $group->addElt($result);
            }
            $this->elements[count($this->elements)] = $group;
        }
    }

    private function parseDicesExpression($expression) {
        if ( stripos($expression, 'd') === FALSE ) {
            return new StaticValue($expression);
        } else {
            $group = new Group("+");
            $results = array();
            $nombre = 0;
            $diceDetail = "";

            $diceElt = explode("d", $expression);

            if($diceElt[0] == "") {
                $nombre = 1;
            } else {
                $nombre = (int) $diceElt[0];
            }

            $diceDetail = $diceElt[1];

            for ($i = 0; $i < $nombre; $i++) {
                $group->addElt(new Dice($diceDetail));
            }
            return $group;
        }
    }

    private function launch() {
        foreach ($this->elements as $elt) {
            $elt->launch();
        }
    }

    private function toString() {
        $result = "";
        foreach ($this->elements as $elt) {
            $result = $result . $elt->toString();
        }
        $result = $result . " = " . $elt->getResultat();
        return $result;
    }
}

?>
