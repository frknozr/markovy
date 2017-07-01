import sys
import math

unknown_transition_prob = 0.000001
BASE = float(2)

class table:
	def __init__(self):
		self.body = {}

	def get_keys(self):
		return self.body.keys()

	def merge_letters(self,ngram,letters):
		letters_keys = letters.get_keys()
		for key in letters_keys:
			self.body[ngram].update(key,letters.get(key))

	def add(self,ngram,letters):
		keys = self.get_keys()
		if ngram in keys:
			self.merge_letters(ngram,letters)
		else:
			self.body[ngram] = letters

	def calculate(self):
		for key in self.get_keys():
			self.body[key].calculate()

	def get_probability(self,ngram,letter):
		try:
			return self.body[ngram].get(letter)
		except Exception as e:
			return unknown_transition_prob

	def print_table(self):
		for key in self.get_keys():
			print key
			self.body[key].print_letters()

class letters:
	def __init__(self):
		self.body = {}

	def get(self,key):
		return self.body[key]

	def get_keys(self):
		return self.body.keys()

	def update(self,letter,num):
		keys = self.get_keys()
		if letter in keys:
			self.body[letter] += num
		else:
			self.body[letter] = 1

	def add(self,letter):
		keys = self.get_keys()
		if letter in keys:
			self.body[letter] += 1
		else:
			self.body[letter] = 1

	def calculate(self):
		acc = 0
		keys = self.get_keys()
		for key in keys:
			acc += self.body[key]

		for key in keys:
			self.body[key] = (float(self.body[key]) / float(acc))

	def print_letters(self):
		print self.body


def discard_stopwords(words):
	stopwords = ["end","","up"," ","don't","a","able","about","across","after","all","almost","also","am","among","an","and","any","are","as","at","be","because","been","but","by","can","cannot","could","dear","did","do","does","either","else","ever","every","for","from","get","got","had","has","have","he","her","hers","him","his","how","however","i","if","in","into","is","it","its","just","least","let","like","likely","may","me","might","most","must","my","neither","no","nor","not","of","off","often","on","only","or","other","our","own","rather","said","say","says","she","should","since","so","some","than","that","the","their","them","then","there","these","they","this","tis","to","too","twas","us","wants","was","we","were","what","when","where","which","while","who","whom","why","will","with","would","yet","you","your"]
	for s in stopwords:
		words.discard(s)
	return words

def discard_numbers(words):
	discards = []
	for word in words:
		if is_number(word):
			discards.append(word)
	for dis in discards:
		words.discard(dis)
	return words

def replace_puncts(line):
	puncts = [".",";",",","?","\"","!",":","-","(",")","_","\'","=","[","]","#","/","|","*"]
	for p in puncts:
		line = line.replace(p," ")
	return line

def is_number(string):
	try:
		temp = int(string)
		return True
	except Exception as e:
		return False

def read_text(filename):

	with open(filename) as f: lines = [line.rstrip('\n') for line in f]

	words = set()
	for line in lines:
		line = replace_puncts(line).lower()
		words |= set(line.split(" "))

	words = discard_stopwords(words)
	words = discard_numbers(words)

	return words

def build_model(filename,t):
	words = read_text(filename)
	create_table(words,t)

def create_ngram(n,string):
	size = len(string)
	step = n - 1
	ngrams = []
	ngrams_ = {}
	for i in range(0,size-step):
		ngram = ""
		for j in range(i,i+n):
			ngram += string[j]
		ngrams.append(ngram)
	for i in range(len(ngrams)-1):
		ngrams_[ngrams[i]] = ngrams[i+1][n-1]
	return ngrams_

def create_table(words,t):
	N = 2
	for word in words:
		ngrams = create_ngram(N,word)
		for key in ngrams.keys():
			l = letters()
			l.add(ngrams[key])
			t.add(key,l)

def calculate_probability(word,t):
	N=2
	sum_prob = 0
	ngrams = create_ngram(N,word)
	for key in ngrams.keys():
		ngram = key
		letter = ngrams[key]
		prob = t.get_probability(key,ngrams[key])
		sum_prob += math.log(prob,BASE)
	if get_evaluation_factor(word) >= sum_prob:
		return {"status":False,"eval":get_evaluation_factor(word),"prob":sum_prob,"text":word}
	else:
		return {"status":True,"eval":get_evaluation_factor(word),"prob":sum_prob,"text":word}

def get_evaluation_factor(word):
	return len(word) * (math.log(unknown_transition_prob,BASE) / 2.5)


def run(word):
	t = table()
	build_model("corpus",t)#corpus is dataset name
	t.calculate()
	#t.print_table()
	result = calculate_probability(word,t)
	return result


if len(sys.argv) < 2:
	print "usage: python markov.py <string>"
else:
	result = run(sys.argv[1])

	if result["status"]:
		print result["text"] + " seems legit"
	else:
		print result["text"] + " seems random"
	print "Probability: " + str(result["prob"]) 
	print "Evaluation Value: " + str(result["eval"])
