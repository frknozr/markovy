
var words = ["facebook","twitter","google","youtube","linkedin","wordpress","instagram","pinterest","wikipedia","wordpress","blogspot","apple","adobe","tumblr","youtu","amazon","vimeo","goo","godaddy","yahoo","microsoft","flickr","bit","qq","buydomains","whoisprivacyprotect","w3","vk","nytimes","reddit","baidu","t","europa","ascii","bbc","statcounter","weebly","myspace","gov","yandex","soundcloud","blogger","mozilla","google","github","bluehost","cnn","wix","addthis","parallels","creativecommons","huffingtonpost","issuu","miitbeian","feedburner","nih","go","imdb","theguardian","digg","stumbleupon","forbes","google","123-reg","paypal","tinyurl","wsj","wp","jimdo","msn","dropbox","miibeian","wixsite","washingtonpost","slideshare","amazonaws","yelp","weibo","google","eventbrite","telegraph","archive","etsy","addtoany","reuters","typepad","sourceforge","free","domainmarket","livejournal","bloomberg","about","ebay","dailymail","aol","bing","mail","sina","usatoday","ameblo","fc2","amazon","51","time","secureserver","macromedia","e-recht24","taobao","domainactive","wikimedia","constantcontact","gravatar","yahoo","eepurl","amazon","harvard","latimes","npr","cdc","guardian","xing","surveymonkey","live","dailymotion","webs","namejet","mit","blogspot","amzn","list-manage","stanford","wired","bbb","icio","opera","apache","tripadvisor","businessinsider","rambler","hostnet","nasa","kickstarter","independent","cnet","cpanel","hatena","bandcamp","bbc","gnu","geocities","cpanel","scribd","amazon","joomla","elegantthemes","ted","163","imgur","photobucket","google","behance","tripod","directdomains","delicious","medium","1und1","google","googleusercontent","deviantart","un","disqus","trustpilot","pbs","github","ca","who","wiley","nationalgeographic","mashable","google","cbsnews","ibm","goodreads","berkeley","google","whitehouse","barnesandnoble","homestead","detik","nbcnews","spotify","foxnews","theatlantic","one","rakuten","nature","buzzfeed","techcrunch","plesk","cornell","beian","usda","squarespace","sciencedirect","loopia","mijndomein","change","ft","vkontakte","blogspot","visma","loopia","cbc","doubleclick","sakura","epa","noaa","blogspot","ow","php","blogspot","webmd","economist","loc","springer","meetup","sfgate","spiegel","4","technorati","nps","themeforest","networksolutions","bizjournals","usnews","ning","cbslocal","wikia","engadget","prnewswire","chicagotribune","wp","xinhuanet","newyorker","gizmodo","abc","list-manage1","bola","slate","cnbc","cloudfront","skype","jiathis","hp","about","fda","foursquare","line","mapquest","nydailynews","blogspot","wufoo","umich","businessweek","acquirethisname","marriott","domainname","booking","house","state","1and1","unesco","bigcartel","fortune","yale","columbia","indiegogo","ustream","ed","youku","irs","storify","phpbb","sogou","sedo","rs6","geocities","google","examiner","google","vice","myshopify","nifty","upenn","boston","indiatimes","naver","a8","washington","hibu","fb","hilton","marketwatch","histats","home","livedoor","axs","doi","ocn","weather","oracle","zdnet","nhs","afternic","smh","1and1","senate","ucla","archives","theverge","samsung","android","businesswire","fb","domainnameshop","linksynergy","uk2","phoca","theglobeandmail","nypost","utexas","umn","wunderground","umblr","wisc","scientificamerican","domeneshop","fastcompany","enable-javascript","alibaba","psu","debian","dribbble","ap","academia","ox","thetimes","uol","campaign-archive1","sagepub","clickbank","bestfwdservice","campaign-archive2","nazwa","salon","dreamhost","mailchimp","sciencemag","si","worldbank","ftc","goo","wikihow","census","intel","mozilla","gofundme","walmart","google","princeton","nymag","discovery","t-online","evernote","elpais","mirror","fbcdn","drupal","houzz","usgs","mlb","hostgator","inc","networkadvertising","cam","rollingstone","nyu","hbr","alexa","cisco","thedailybeast","oxfordjournals","arstechnica","prweb","lemonde","newsweek","entrepreneur","icann","xiti","politico","studiopress","google","exblog","tandfonline","oecd","dropboxusercontent","cmu","uchicago","aboutcookies","target","odin","espn","globo","hollywoodreporter","feedly","hhs","allaboutcookies","lifehacker","ok","list-manage2","mysql","shareasale","livestream","hubspot","dell","stackoverflow","zendesk","aljazeera","office","news","smugmug","youronlinechoices","web","tripadvisor","admin","researchgate","jugem","bls","adweek","cafepress","usc","variety","att","duke","bmj","unc","mtv","redcross","shinystat","nhk","today","ieee","example","box","ewebdevelopment","accuweather","themegrill","com","fao","apa","ebay","ucsd","telnames","liveinternet","seattletimes","istockphoto","army","va","nielsen","nsw","venturebeat","register","managemy","netflix","bostonglobe","teamviewer","washingtontimes","vox","pcworld","dot","symantec","warnerbros","google","telegram","blogspot","ibtimes","bund","gpo","antaranews","shop-pro","dandomain","prezi","netscape","google","eventbrite","usa","nginx","aliyun","windowsphone","openstreetmap"];

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}


var getBaseLog = function(y, x) {
  return Math.log(y) / Math.log(x);
}

var get_evaluation_factor = function(word){
	return word.length * (getBaseLog(unknown_transition,BASE) / 2.5);
}

var unknown_transition = 0.000001;
var BASE = 2;


function Table(){
	this.body = {};
	
	this.get_keys = function(){
		keys = [];
		for(var i in this.body){
			keys.push(i);
		}
		return keys;
	}

	this.merge_letters = function(ngram,letters){
		letters_keys = letters.get_keys();
		for(var i=0;i<letters_keys.length;i++){
			var key = keys[i];
			this.body[ngram].update(key,letters.get(key))
		}
	};

	this.add = function(ngram,letters){
		keys = this.get_keys()
		if(keys.contains(ngram)){
			this.merge_letters(ngram,letters);
		}
		else{
			this.body[ngram] = letters
		}
	};

	this.calculate = function(){
		keys = this.get_keys();
		for(var i=0;i<keys.length;i++){
			var key = keys[i];
			this.body[key].calculate();
		}
	};

	this.get_probability = function(ngram,letter){
		if(this.body[ngram] === undefined){
			return unknown_transition;
		}
		else{
			if(this.body[ngram].get(letter) === undefined){
				console.log(ngram)
				return unknown_transition;
			}
			
			else{
				console.log(ngram)
				return this.body[ngram].get(letter)

			}
		}
		
	};

	this.print_table = function(){
		keys = this.get_keys();
		for(var i=0;i<keys.length;i++){
			var key = keys[i];
			console.log(key);
			this.body[key].print_letters();
		}
	};
}


function Letters(){
	this.body = {};

	this.get = function(key){
		return this.body[key];
	};

	this.get_keys = function(){
		keys = [];
		for(var i in this.body){
			keys.push(i);
		}
		return keys;
	};

	this.add = function(letter){
		keys = this.get_keys();
		if(keys.contains(letter)){
			this.body[letter]++;
		}
		else{
			this.body[letter] = 1;
		}
	}

	this.update = function(letter,num){
		keys = this.get_keys();
		if(keys.contains(letter)){
			this.body[letter] = this.body[letter] + num;
		}
		else{
			this.body[letter] = 1;
		}
	}

	this.calculate = function(){
		acc = 0;
		keys = this.get_keys();
		for(var i=0;i<keys.length;i++){
			var key = keys[i];
			acc += this.body[key];
		}

		for(var i=0;i<keys.length;i++){
			var key = keys[i];
			this.body[key] = this.body[key] / acc;
		}
		console.log("calculate worked");
	}

	this.print_letters = function(){
		console.log(this.body);
	}
}


var build_model = function(t){
	create_table(words,t);
	console.log("model created")
}

var create_table = function(words,t){
	N = 2;
	for(var i=0;i<words.length;i++){
		word = words[i];
		ngrams = create_ngram(N,word);
		for(var key in ngrams){
			var l = new Letters();
			l.add(ngrams[key]);
			t.add(key,l);
		}
	}
	console.log("table created")
}


var create_ngram = function(n,string){
	size = string.length;
	step = n - 1;
	ngrams = [];
	ngrams_ = {};
	for(var i=0;i<size-step;i++){
		ngram = "";
		for(var j=i;j<i+n;j++){
			ngram = ngram + string[j];
		}
		ngrams.push(ngram);
	}

	for(var i=0;i<ngrams.length-1;i++){
		var temp = ngrams[i+1];
		ngrams_[ngrams[i]] = temp[step];
	}
	return ngrams_;
}

var calculate_probability = function(word,t){
	N=2;
	sum_prob=0;
	ngrams = create_ngram(N,word);
	for(var key in ngrams){
		ngram = key;
		letter = ngrams[key];
		prob = t.get_probability(key,ngrams[key])
		sum_prob = sum_prob + getBaseLog(prob,BASE);
	}
	evaluation_value = get_evaluation_factor(word);
	console.log(evaluation_value);
	console.log(sum_prob);
	if(evaluation_value > sum_prob)
		console.log("random");
	else{
		console.log("legit");
	}
}

var run = function(word){

	calculate_probability(word,t);
}

var t = new Table();
build_model(t);
t.calculate();
run("zxcfasdcz");
run("cyberstruggle");
