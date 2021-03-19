NPM=npm
NPMRUN=$(NPM) run
FIREBASE=firebase

install:
	$(NPMRUN) install

start:
	$(NPM) start

lint:
	$(NPMRUN) lint

tests:
	$(NPMRUN) test

reactbuild:
	$(NPMRUN) build

deploy:
	$(FIREBASE) deploy