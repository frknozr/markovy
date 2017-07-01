#!/usr/bin/env python
import sys

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

def with_file(filename):

	with open(filename) as f: lines = [line.rstrip('\n') for line in f]

	words = set()
	for line in lines:
		line = replace_puncts(line).lower()
		words |= set(line.split(" "))

	words = discard_stopwords(words)
	#words = discard_numbers(words)

	for w in words:
		print w

def is_number(string):
	try:
		temp = int(string)
		return True
	except Exception as e:
		return False

def with_stdin(data):
	words = set()
	for line in data:
		line = replace_puncts(line).lower()
		words |= set(line.split(" "))

	words = discard_stopwords(words)
	words = discard_numbers(words)

	for w in words:
		print w

if len(sys.argv) > 1:
	with_file(sys.argv[1])
else:
	data = [line.replace("\n","") for line in sys.stdin.readlines()]#problem
