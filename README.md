


Initially I broke the calculator down into individual steps and processes i.e "Store user input", "Display current input" etc.

On day one I wrote out the html and styled it using scss. I found that the different media queries weren't actually necessary for this as it seemed to format itself well automatically (tested on my phone to ensure this). 
I knew that it would need to store all of the user's inputs in a calculation, so decided an array would be best suited for this. I wrote a function to get the inner text of the buttons and store these in an Equation Array variable. I called this using "onclick" in the html elements as I found this to be more readable (and quicker to write out). 

From the get go I had in mind the idea that javascript can natively perform pretty much all of the arithmetic required for a calculator, all I needed to do was find a way to execute my equation array (i.e [1, +, 2, *, 3] as literal code, and JS would do a lot of the heavy lifting for me. 
I did some research and found a method using Function("return " + array.join())(); and with this had the basic arithmetic working by the end of the first day. One of the main reasons for doing it this way was scalability, as i could later add any mathematic operators that JS could read and this function would be able to handle it.

However, I later realised that, from a security standpoint, this would not be best practice, as it would open the door for users to manipulate the inputs and essentially add custom 
code/functions to the program. For obvious reasons, this is not a good idea. Were I to approach it again, I would likely use a switch case and manually write the arithmetic functions. 

On day two, I wrote functions for the inversion operator & the AC button, limited decimal places, and changed the display setup to only display the most recent input to allow more space.

By days three and four I was mostly on to bug fixing. 

Something that did stump me for a while was how to handle exponential / large numbers. I did some searching and found the toExponential() method, as again I realised that JS did this natively, however the breakpoint at which a number would format as exponential was too high for my calculator's screen. It took me a while to get this functioning correctly within the program, largely due to me overcomplicating things with uncessary conditions etc.


Were I to approach the task again, I would definitely format my JS differently. The main function (get button value) is way too large, and I approached it with the philosophy of 
"I'll reformat this later" which was not the right choice, as it is now difficult to reformat without things breaking. Lesson learned. 
Ideally I will know by then how to save functions in different files and import them as this would be so much tidier.
I would also test every component of the program (at least with a small program like this) when a feature is changed/added, even if it doesn't seem like something that would be affected, as finding a new issue after several changes and having to re-trace your steps is a nightmare.

Finally I added a palette swap feature, purely because I wanted to learn how to do this using JS. In doing this I learned a method for cycling through arrays which will definitely come in handy.

Overall I am proud of this project, it's not perfect but it is definitely not something I would have easily made before starting the course, and I've learned many useful lessons and skills in the process.




KNOWN BUGS: >Equation array has a length limit for correct display, but this affects input when working with several large numbers. Something to do with the equals function as bug doesn't   
            occur until this function is run.
            >Inversion operator has at some point stopped function correctly (numbers will invert but then default back to positive when trying to use them in an equation.) Likely causes are the equals function or something to do with the opIndex variable.
