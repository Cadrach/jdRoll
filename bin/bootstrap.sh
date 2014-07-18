echo "Avant d'exécuter ce script il faut : "
echo " - Installer Mysql"
echo " - Installer php"
echo " - Installer node"
echo "Voulez vous continuer (y/n) ? "
read cont
if [ "$cont" = "y" ]; then
    echo "******** Installation des dependances Php ********"
    curl -s http://getcomposer.org/installer | php
    php composer.phar install
    php composer.phar dumpautoload -o
    echo "******** Installation des outils ********"
    sudo npm install -g bower grunt grunt-cli
    npm install
    echo "******** Installation des dependances Web ********"
    bower install
    echo "******** Initialisation de la base de données ********"
    echo "Veuillez saisir votre utilisateur mysql : "
    read user
    echo "Veuillez saisir le mot de passe de la base de données : "
    read pass
    echo "Veuillez saisir le nom de la base de données : "
    read db
    echo "Suppression de la base actuel"
    mysql -u $user -p$pass -e "DROP DATABASE $db" 2> /dev/null
    mysql -u $user -p$pass -e "CREATE DATABASE $db"
    echo "Création du schéma"
    cat ddl.sql | mysql -u $user -p$pass -D $db
    echo "Initialisation des données"
    cat bin/data.sql | mysql -u $user -p$pass -D $db
    echo "******** Installation de la configuration ********"
    cp config.dist.yml config.yml
    sed 's\YOUR_USER\'$user'\g' config.yml -i config.yml
    sed 's\YOUR_DB\'$db'\g' config.yml -i config.yml
    sed 's\YOUR_PWD\'$pass'\g' config.yml -i config.yml
    echo "******** Fin de préparation de l'environnement ********"
    echo "Par la suite, vous pouvez lancer un serveur http avec la commande : grunt dev"
    echo "Deux comptes sont disponible : "
    echo "Login : Admin, Password: Admin"
    echo "Login : User, Password: User"
fi