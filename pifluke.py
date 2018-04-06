import os
import time
from time import sleep
import Tkinter
from Tkinter import *
import datetime
from tkMessageBox import *
import tkMessageBox
import smtplib

window = Tkinter.Tk() 			# initialise window and set size and title
window.minsize(320, 240)
window.title("PiFluke 1.0")


global showip		#initialise showip variable as global and give it a value of nothing
showip = ""

def getip():      	#this function captures ip info using ifconfig and saves it to a variable called showip

	ip = os.popen("ifconfig eth0 | grep -o -P '.{0,5}inet addr:.{0,15}'")
	global showip
	showip = ip.read()
	ipwindow.delete(0, END)
	ipwindow.insert(0, showip)
	if not showip:
		ipwindow.delete(0, END)
		ipwindow.insert(0, "Dead Link Or Re-Connect Cable")

def getaddr(): #gets email adress from user and stores it in emailconfig.txt

	global receipt
	receipt = open("/home/pi/Desktop/emailconfig.txt", "r")
	global addrwindow
	addrwindow = Tkinter.Tk()
	addrwindow.minsize(250, 100)
	global addrinfo	
	b = Label(addrwindow, text="Enter Your Email Adress")
	addrinfo = Entry(addrwindow, width=25)
	b.pack()
	addrinfo.pack()	
	addrinfo.delete(0, END)
	addrinfo.insert(0, receipt.read())
	
	
	sendemailbtn = Tkinter.Button(addrwindow, text="Send Email", command=sent)
	sendemailbtn.pack()
	addrwindow.geometry("250x100-150+150")
	addrwindow.mainloop()

def sent(): # sends email with adress gathered from getaddr

	receipt = open("emailconfig.txt", "w")
	print addrinfo.get()
	receipt.write(addrinfo.get())
	receipt.close()
	global file
	file = open("itracs.txt", "r")
	receipt = open("emailconfig.txt", "r")
	server = smtplib.SMTP('127.0.0.1', 25)
	msg = "Subject: iTracs From Pi Fluke" + "\n" + file.read() 
	server.sendmail("PiFluke@Deskside.co.uk", receipt.read(), msg)
	addrwindow.destroy()
	


	
	



def extrainfo():	#this function allows the user to input exta information to be written to iTracs 

	global extra
	extra = Tkinter.Tk()
	extra.minsize(250, 100)
	global info
	a = Label(extra, text="Enter Physical Port Number \n And Any Other Useful Info Here : EG Port A10")
	info = Entry(extra)
	a.pack()
	info.pack()	
	itracsbtn = Tkinter.Button(extra, text="Write iTracs", command=itracs)
	itracsbtn.pack()
	extra.geometry("300x150-150+150")
	extra.mainloop()
	
				
def itracs(): 		#this function writes iTracs information to a txt file called itracs.txt 
	
	
	print info.get()
	today = datetime.datetime.today()
	print (showstack)
	print (showvlan)
	print (showport)
	fi = open("itracs.txt", "a")
	fi.write("\n" + str(today) + "\n")
	fi.write(info.get() + "\n")
	fi.write(showip)
	fi.write(showstack + showvlan + showport)
	fi.close()
	extra.destroy()

	
	
def getlldp():		#this function gets LLDP information using LLDPCTL command

	global showstack
	showstack = ""
	global showvlan
	showvlan = ""
	global showport
	showport = ""
	
	os.popen("sudo service lldpd restart")
	stackwindow.delete(1.0, END)
	portwindow.delete(1.0, END)
	vlanwindow.delete(1.0, END)
	
		
	while not showstack:  	#while there is no LLDP information loop request to get LLDP using LLDPCTL 
		
	
		if not showip:		#If machine has no IP break loop and request IP refresh			
				stackwindow.insert(END, "               No Link - Please Refresh IP")
				break

		stack = os.popen("lldpctl eth0 | grep -o -P '.{0,0}SysName:.{0,45}'")
		showstack = stack.read()
		port = os.popen("lldpctl eth0 | grep -o -P '.{0,0}PortID:.{0,45}'")
		showport = port.read()
		vlan = os.popen("lldpctl eth0 | grep -o -P '.{0,0}VLAN:.{0,14}'")
		showvlan = vlan.read()
		
		
		stackwindow.insert(END, showstack)
		vlanwindow.insert(END, showvlan)
		portwindow.insert(END, showport)
			
#below are defined all the buttons and text boxes of the main window	
		
ipbtn = Tkinter.Button(window, text="Refresh IP", command=getip)    
		
ipwindow = Entry(window, width = 25)		
ipwindow.insert(0, "       No IP Info - Refresh IP")
ipwindow.pack()
ipbtn.pack()

stackwindow = Text(window, width=55, height=1)
stackwindow.insert(END, "  Please Be Aware LLDP Capture May Take A Few Moments")

portwindow = Text(window, width=55, height =1)
portwindow.insert(END, "                  Please Capture LLDP")
portwindow.pack()


vlanwindow = Text(window, width=55, height =1)
vlanwindow.insert(END, "")
vlanwindow.pack()

stackwindow.pack()

lldpbtn = Tkinter.Button(window, text="Capture LLDP", command=getlldp)
lldpbtn.pack()

infobtn = Tkinter.Button(window, text="Gather iTracs Info", command=extrainfo)
infobtn.pack()

mailerbtn = Tkinter.Button(window, text="Send iTracs Info Via Email", command=getaddr)
mailerbtn.pack()

window.mainloop()
