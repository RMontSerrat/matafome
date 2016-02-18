setup:
	@echo instalando dependencias python
	@sudo pip install --upgrade -r api/config/requirements.txt
	@echo instalando dependencias javascript
	@npm install
	@echo instalando gulp
	@sudo npm install -g gulp

test-python:
	@cd api/; python tests.py

run:
	@honcho start

start:
	@make start

elasticsearch:
	@cd api/commands/; python config.py
	@cd api/commands/; python config_test.py


clean-elasticsearch:
	@curl -XDELETE 'localhost:9200/emails/'
	@curl -XDELETE 'localhost:9200/emails_test/'

define HELP_TEXT
Sieve Desafio Help:
-------------------------
    $$ make setup 								- configura o projeto e instala dependências
    $$ make elasticsearch 							- indexa json no elasticsearch
    $$ make test-python 								- executa os testes da api
    $$ make run 									- executa a api
    $$ make clean-elasticsearch 							- limpa o index de emails e de teste do elasticsearch
endef
export HELP_TEXT

help:
	@echo "$$HELP_TEXT"