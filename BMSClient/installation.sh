sudo apt-get update
apt-get install python3-pip -y
pip3 install --upgrade pip
pip3 install flask
pip3 install pymongo
pip3 install dnspython
export FLASK_APP=src
export FLASK_ENV=development
cd src
flask run