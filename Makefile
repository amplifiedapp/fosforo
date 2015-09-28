publish:
	npm install
	npm run build
	git checkout gh-pages
	git add .
	git commit -m "New page version"
	git push origin gh-pages
	git checkout master
