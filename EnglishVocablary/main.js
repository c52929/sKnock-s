'use strict';
{
  let word, meaning, examples;
  let list_num, list_i, allN;
  let ex;

  prepareList();

  for(let i=0; i<26; i++){
    const addCommunication=document.createElement('div');
    if(i<8){
      addCommunication.setAttribute('id',`b${i}`);
      addCommunication.textContent=`Lesson ${i+2}`;
      addCommunication.classList.add("comB");
      document.getElementById("communication").appendChild(addCommunication);
    }else if(20<=i && i<=23){
      addCommunication.classList.add("comB","empty");
      document.getElementById("communication").appendChild(addCommunication);
    }else if(i==24 || i==25){
      addCommunication.classList.add("mathB","empty");
      document.getElementById("mathematics").appendChild(addCommunication);
    }else{
      addCommunication.setAttribute('id',`b${i}`);
      addCommunication.textContent=`#${i-7}`;
      addCommunication.classList.add("mathB");
      document.getElementById("mathematics").appendChild(addCommunication);
    }
  }

  for(let i=0; i<20; i++){
    document.getElementById(`b${i}`).addEventListener('click',()=>{
      document.getElementById("buttons").classList.add("none");
      if(i<8){
        document.getElementById("subject").textContent=`English Communication Lesson ${i+2}`;
      }else{
        document.getElementById("subject").textContent=`Basic English for Science #${i-7}`;
      }
      allN=[];
      for(let j=0; j<word[i].length; j++){
        allN.splice(Math.floor(Math.random()*(allN.length+1)),0,j);
      }
      list_num=i;
      list_i=0;
      display();
      document.getElementById("display").classList.remove("none");
      document.getElementById("touchscreen").classList.remove("none");
      // console.log("list_num = ", i);
      // console.log("allN = ",allN);
    });
  }

  document.getElementById("touchscreen").addEventListener('click',(e)=>{
    let touch_x=e.pageX;
    let width=window.innerWidth;
    if(touch_x<width/2){
      if(list_i>0){
        list_i--;
        display();
      }
    }else{
      if(list_i+1<allN.length){
        list_i++;
        display();
      }else{
        document.getElementById("buttons").classList.remove("none");
        document.getElementById("display").classList.add("none");
        document.getElementById("touchscreen").classList.add("none");
      }
    }
  });

  document.addEventListener('keydown',(e)=>{
    if(e.key=="ArrowLeft"){
      if(list_i>0){
        list_i--;
        display();
      }
    }else if(e.key=="ArrowRight"){
      if(list_i+1<allN.length){
        list_i++;
        display();
      }else{
        document.getElementById("buttons").classList.remove("none");
        document.getElementById("display").classList.add("none");
        document.getElementById("touchscreen").classList.add("none");
      }
    }
  });

  function display(){
    document.getElementById("i").textContent=`${list_i+1}/${allN.length}`;
    document.getElementById("word").textContent=word[list_num][allN[list_i]];
    document.getElementById("meaning").innerHTML=meaning[list_num][allN[list_i]];
    let exnow=examples[list_num][allN[list_i]];
    let j=0;
    document.getElementById("example1").classList.remove("imgin");
    document.getElementById("example2").classList.remove("imgin");
    if(exnow.indexOf("¥")>=0){
      ex=["",""];
      for(let i=0; i<exnow.length; i++){
        if(exnow.charAt(i)=="¥"){
          j++;
        }else{
          if(exnow.charAt(i)=="$"){
            ex[j]+='<img src="img/';
          }else{
            ex[j]+=exnow.charAt(i);
          }
        }
      }
      for(let j=0; j<2; j++){
        if(ex[j].charAt(0)=="<"){
          ex[j]+='.jpeg">';
          document.getElementById(`example${j+1}`).classList.add("imgin");
        }
      }
      document.getElementById("example1").innerHTML=ex[0];
      document.getElementById("example2").innerHTML=ex[1];
      document.getElementById("example1").classList.remove("none");
      document.getElementById("example2").classList.remove("none");
    }else if(exnow==""){
      document.getElementById("example1").classList.add("none");
      document.getElementById("example2").classList.add("none");
    }else{
      if(exnow.charAt(0)=="$"){
        ex='<img src="img/';
        for(let i=1; i<exnow.length; i++){
          ex+=exnow.charAt(i);
        }
        ex+='.jpeg">';
        document.getElementById("example1").innerHTML=ex;
        document.getElementById("example1").classList.add("imgin");
      }else{
        document.getElementById("example1").innerHTML=exnow;
        document.getElementById("example1").classList.remove("imgin");
      }
      document.getElementById("example1").classList.remove("none");
      document.getElementById("example2").classList.add("none");
    }
  }
  
  function prepareList(){
    word=[
      ["Desktop Computer","Portable Technology / Portable device","Laptop Computer","Notebook Computer","Tablet Computer","e-reader","Mobile Technology / Mobile device","Mobile Phone","Smartphone","Digital Audio Player (mp3 player)","Key","Keyboard","Monitor or Screen","Cursor","Mouse","Trackpad or Touchpad","Touchscreen","CPU (Central Proccesing Unit)","Speaker","Microphone","USB (Universal Serial Bus)","USB Type C","Port (USB port, speaker port, microphone port, etc.)"],
      ["Computational Thinking","algorithm","input","output","sequence","abstraction","decomposition","flow chart","repetition","selection"],
      ["Internet","World Wide Web","Website","Webpage","HTML","HTTP","Web Browser","Search Engine","URL","hyperlink","hypertext"],
      ["Presentation","Document","Theme","Slide","Style","Fill","Border","Opacity","Title","Caption","Shape","Media","Transition","Build","Build in","Build out"],
      ["Graphics","Image","Editing","Dimensions","Proportionally","Scaling","Scale Up","Scale Down","Cropping","Rotating","Clockwise","Counter-clockwise","jpeg, jpg","gif","png","tiff, tif"],
      ["Digital Video","Digital Audio","mpg, mped (also mp4)","avi","wmv","mov","mkv","lossless","lossy","mp3","wma","wav","flac","aiff"],
      ["clipboard","delete","copy","cut","paste","font","point","bold","italic","underline"],
      ["Database","Spreadsheet","cell","formula","function","SUM","AVERAGE","MAX","MIN","IF","ROUND","NOW","Line Graph","Bar Graph","Scatter plot","Pie Chart"],
      ["Number","Numeral","Integer","Digit","Single digit numbers","Double-digit numbers","Triple-digit numbers","Place Value","Ones place","Tens place","Hundreds place","One","Ten","Hundred","Thousand","Million","Billion","Trillion","Cardinal Number","Ordinal Number","First, Second, Third","Fourth, Fifth, Sixth","Twelfth, Thirteenth","Twenieth, Thirtieth","Even Number","Odd Number"],
      ["Addition","Add","Equation","Plus Sign",'"Plus"',"Equals Sign",'"Equals"',"Regroup","carry","Addend","Sum"],
      ["Subtraction","Subtract","Minus Sign",'"Minus"','"Take Away"',"Regroup","Borrow","Difference"],
      ["Multiplication","Multiply","Multiplication sign","Times sign",'"Times"',"Product","Factors","Prime Number","Composite Number","Multiple"],
      ["Division","Divide","Division sign",'"Divided by"',"Remainder","Dividend","Divisor","Quotient","Divisible"],
      ["Fractions","One half, two halves","One third, two thirds","One fourth, two fourths","One fifth, two fifths","One sixth, two sixths","One seventh, two sevenths", "Numerator","Denominator",'"x over y"',"Whole","Equivalent fractions","Improper fraction","Mixed number","Invert","Reciprocal"],
      ["Decimal","Tenths place","Hundredths place","Decimal point",'"Point"',"Percentage","Percent sign",'"Percent"'],
      ["Negative number",'"Negative x"','"Minus x"',"Inequality",'"Is greater than"','"Is less than"','"Is greater than or equal to"','"Is less than or equal to"','"Does not equal"','"Is not equal to"'],
      ["Exponential term","Exponent","Base number",'"x squared"','"x to the second power"','"x cubed"','"x to the third power"','"x to the fourth power"',"Square","Square root","Radical expression","Radical","Radicand",'"The square root of x"',"Perfect square"],
      ["Geometry","Infinity","Plane","Point","Line","Ray","Segment","Angle","Degrees","Right (angle)","Acute","Obtuse","Parallel","Perpendicular","Congruent"],
      ["Polygon","Triangle","Quadrilateral","Parallelogram","Rectangle","Rhombus","Square","Trapezoid","Pentagon","Hexagon","Octagon","Circle","Radius","Diameter","Circumference","Area","Pi","Solid","Cube","Sphere","Cylinder","Cone","Pyramid"],
      ["Data","Statistics","Range","Mode","Mean","Median","Variable","Pictograph","Bar Graph","Key (Legend)","Scale","Circle Graph (Pie Chart)","Venn Diagram","Line Graph","Scatterplot","x axis","y axis","Ordered Pairs"]
    ];
    meaning=[
      ["A computer that sits on top of a desk. A desktop is NOT portable and NOT mobile.","Technological devices that are easy to carry, but don't fit in your pocket.","A computer that can be used on your lap. A laptop is portable technology.","Another name for a laptop computer.","A tablet-shaped computer that uses touchscreen commands. A tablet is portable technology.","A tablet-shaped device that can only be used to read digital books. An e-reader is portable technology.","Technological devices that fit in your pocket.","A telephone that fits in your pocket.","A mobile telephone that looks and operates like a small tablet, with full internet access. A smartphone is mobile technology.","A mobile device that only plays music. A Digital Audio Player (mp3 player) is mobile technology.","A button that gives information to your computer when you press it.","All of the computers keys arranged for use.","This shows you what your computer is doing. It works like a TV.","An arrow that you can see on your monitor, which is used to give commands to your computer.","A tool for giving commands to your computer. It controls the cursor on your monitor. You drag the whole mouse with your hand to move the cursor.","A different tool for giving commands to your computer. It controls the cursor on your monitor. You drag your finger across the surface of the pad to move the cursor.","A screen (monitor) that accepts command through touch. All tablets and smartphones, and some computers, use touchscreens.","The actual computer, the unit that does all the calculations","These put out sound, such as music, or feedback sounds.","This takes in sound, such as your voice, for recording or transmitting.","A connection for a computer.","The newest USB.","A hole in your computer for transmitting information in or out."],
      ['"Thinking like a computer."',"A set of instructions.","A command for a computer.","A response (of a computer) to input.","The order of commands.","Using ideas as meaning.","Breaking a process into steps (for example, to make an algorithm).","A visual diagram of an algorithm.","Doing something again, repeating.","Choosing something, selecting."],
      ["The global system of connected computer networks. It is the system that the World Wide Web operates on.","The global system of making information available and searchable, using URLs and hypertext. It operates on the internet.","A collection of web pages accessible on the Internet.","One page of website, what you see on the monitor at one time.","Hypertext Markup Language. The standard language used to make web pages.","Hypertext Transfer Protocol. The standard for data communication on the web.","Software on a personal computer that can be use to search the World Wide Web.","A software system used to search the World Wide Web.","Uniform Resource Locator. This is a web address.","A link. A clickable area, on a web page, that takes you to a new page.","A hyperlink that is text."],
      ["A speech with multimedia support. There is software specifically designed for giving presentations, such as Microsoft Power Point or Apple Keynote.","A computer file.","The overall format of a presentaion.","One page of a presentation.","The color, size, etc., of a shape. The way it looks.","The color of a shape (expect for the edge).","The color and type of the edge of a shape.","The degree to which we can see through a shape.","The name of a shape.","An explanation of a shape.","A geometric figure.","Photos, video, etc.","An animation that changes from one slide to the next.","An animation that introduces or removes text, shapes or media from the same page.","An animation that introduces text, shapes or media from the same page.","An animation that removes text, shapes or media from the same page."],
      ["Digital images and video.","A still graphics file.","Making changes to graphics files.","Measurable distances, for example, the height and width of an image file.","Meaning to increase an image file with matching ratios for the dimensions.","Changing the size of a graphics file proportionally.","To scale to a bigger size.","To scale to a smaller size.","Deleting the top, bottom or edges of a graphic image.","To turn an image.","To rotate in the same direction that a clock moves.","Torotate in the opposite direction that a clock moves.",'An image file, "jpeg" stands for "Joint Photographic Experts Group", and "jpg" is short for "jpeg".','An image file, "gif" stands for "Graphic Interchange Format".','An image file, "png" stands for "Portable Network Graphics".','An image file, "tiff" stands for "Tagged Image File Format".'],
      ["Video files  that can be viewed on a computer.","Audio files (sound: music, voice, etc.) that can be played on a computer.",'A video file, "Moving Pictures Experts Group"; mp4 means "MPEG-4".','A video file, "Audio Video Interleave".','A video file, "Windows Media Video".','A video file, "QuickTime Movie".','A video file, "Matroska Video".',"Lossless audio creates a perfect audio copy.","Lossy audio tries to make smaller file sizes by eliminating unnecessary noises.",'A lossy audio file, "MPEG Audio Layer 3".','A lossy audio file, "Windows Media Audio".','An audio file, there is both Lossy Type and Lossless Type, "Waveform Audio File".','A lossless audio file, "Free Lossless Audio Codec".','A lossless audio file, "Audio Interchange File Format".'],
      ["A virtual space where text or other data can be saved.","Removing text or other data without saving it to the clipboard.","Saving something to the clipboard, without deleting it.","To delete something and save it to the clipboard.","To insert data saved to the clipboard into your document.","The style and shape of characters in a word processing document.","The unit for measuring the size of a font.","Making text heavy and dark.","Making text diagonal.","Making text with a line drawn underneath it."],
      ["A collection of searchable information.","A document showing data in cells, where calculations can be performed.","A single field in a spreadsheet.","Commands that can be entered into a cell of a spreadsheet, to accomplish automatic calculations.","The commands in a formula.","A spreadsheet function that adds numerical data in cells.","A spreadsheet function that calculates the mean (average) of numerical data in cells.","A spreadsheet function that presents the highest number in a numerical data set.","A spreadsheet function that presents the lowest number in a numerical data set.","A spreadsheet function that performs different calculations depending on the value of other cells.","A spreadsheet function that presents numerical data rounded to a set value.","A spreadsheet function that presents the current date and time.","A graph using lines to show amounts. It's good for showing change over time.","A graph using bars to show amounts.","A chart using dots scattered in a grid.","A graph in the shape of a circle, good for showing percentages."],
      ['A "number" answers the question "how many?"',"A written character. The character's meaning is a number.","Whole numbers, NOT partial numbers. Integers can be less than zero, more than zero, and zero is an integer.","The number of characters in a number.","Numbers with one digit.","Numbers with two digits.","Numbers with three digits.","The value of the places held by digits.",'The "ones place" has a value of 1.','The "tens place" has a value of 10.','The "hundreds place" has a value of 100.',"1","10","100","1,000","1,000,000","1,000,000,000","1,000,000,000,000","Integers more than 0. They are used for counting.",'"Ordinal numbers" are used to put things into order.',"The ordinal numbers for the #1, #2 and #3 positions.","The ordinal numbers for the #4, #5 and #6 positions.","The ordinal numbers for the #12 and #13 positions.","The ordinal numbers for the #20 and #30 positions.","One half of an even number is an integer.","One half of an odd number is not an integer."],
      ["In math, the joining of groups.",'A verb, meaning "to join together".',"A string of symbols containing an equals sign.","A symbol that shows we should add.","How we read a plus sign.","A symbol that shows that the amounts on either side are equal.","How we read an equals sign.","To change the place value groupings of a number.",'The old version of explaining "regroup" in addition.',"Numbers that are being added.","Larger group made by adding numbers (the answer to an addition equation)."],
      ["In math, the removal of a group.",'A verb, meaning "to remove" (a group).',"A symbol that shows we should subtract.","How we read a minus sign.","Another way to read a minus sign.","To rearrange the values of columns.",'The old version of explaining "regroup" in subtraction.',"Smaller group made by subtracting numbers (the answer to a subtraction equation)."],
      ["In math, the joining of groups of the same size.",'A verb, meaning "to join groups of the same size".',"A symbol that shows we should multiply.","Another word for a multiplication sign.","How we read a multiplication sign (times sign).","Larger group made by multiplying numbers (the answer to a multiplication equation).","Numbers that, when multiplied, equal the target number.","A number that has only two factors.","A number that has more than two factors.","The possible products of the target number as a factor."],
      ["In math, the separating of groups into smaller groups of the same size.",'A verb, meaning "to separate groups into smaller groups of the same size".',"A symbol that shows we should divide.","How we read a division sign.",'When children divide, they use a "remainder" in order to avoid a non-integer quotient.',"Larger group being divided.","The number you are dividing by.","The size of each group made by dividing (the answer to a division equation).","When a number can be divided without a remainder (the quotient is an integer)."],
      ["In math, numbers that represent equal pieces of a whole.","1/2, 2/2","1/3, 2/3","1/4, 2/4","1/5, 2/5","1/6, 2/6","1/7, 2/7", "The number above the bar in the fraction.","The number below the bar in a fraction.","Another way to read a fraction.",'"1", or a set, shown by a fraction with a numerator that equals the denominator.',"Fractions that have difference denominators, but are equal.","A fraction whose numerator is larger than its denominator.","A number written with whole numbers and fractions.","To reverse the numerator and the denominator of a fraction.",`An inverted fraction is that fraction's "reciprocal".`],
      ["In math, numbers less than one represented in the decimal system.","The digit of a decimal whose value is 1/10.","The digit of a decimal whose value is 1/100.","The mark between the ones column and the tenths column.","How to read a decimal point.",'A number that shows "how many out of 100".',"A sign that shows that a number is a percentage.","How to read a percent sign."],
      ["In math, numbers less than zero.","How to read a negative number.","Another way to read a negative number.","A string of symbols showing amounts that are not equal.","A symbol that show that the number on the left is more than the number on the right.","A symbol that show that the number on the left is less than the number on the right.","A symbol that show that the number on the left is as much or more than the number on the right.","A symbol that show that the number on the left is as much as or less than the number on the right.","A symbol that show that the number on the left is not equal to the number on the right.","Another way to read an inequality sign."],
      ["A mathematical expression, showing a number to be raised by an exponent.","The smaller number of an exponential term, showing how high the base umber is to be raised.","The larger number of an exponential term, showing the number that is to be raised.","How to read an exponential term with an exponent of 2.","Another way to read an exponential term with an exponent of 2.","How to read an exponential term with an exponent of 3.","Another way to read an exponential term with an exponent of 3.","How to read an exponential term with an exponent of 4.","A number that is reached by multiplied by itself, makes the target number.","A number that, when multiplied by itself, make the target number.","A mathematical expression, that represents the square root of a number.","The symbol used in a radical expression.","The number show inside the radical in a radical expression.","How to read a radical expression.","Any number whose square root is an integer."],
      ["The field of mathematics that studies shapes.","Limitless, unending, unstopping.","A two dimensional area.","A position in a plane, that takes up no space.","An infinite, straight extension that passes through at least two points.","Like a line, but having one endpoint.","The section of a line between two points.","Two rays with the same endpoint.","Units used to measure an angle.","A 90° angle.","An angle with less than 90°.","An angle with more than 90°.","Of lines, side by side and never touching.","Of lines, making a 90° angle.","Having the same shape and size."],
      ["A closed figure, in a plane, made of straight lines.","A polygon with 3 sides.","Any polygon with 4 sides.","A quadrilateral with two sets of parallel lines.","A parallelogram with four right angles.","A parallelogram with four equal sides.","A parallelogram with four right angles AND four equal sides.","A quadrilateral with one set of parallel lines.","A polygon with 5 sides.","A polygon with 6 sides.","A polygon with 8 sides.","A round figure, in a plane.","The measure from a circle's center to its side.","The measure from one side of a circle to the other.","The measure all the way around a circle.","The measure of all the space in a circle (or polygon!)","The ratio of circumference to diameter.","A 3D shape.","A square 3D shape.","A round 3D shape, a ball.","A 3D shape, flat on the ends and round on the sides, like a can.","A 3D shape, flat on the bottom, round, and pointed on the end.","A 3D shape, flat on the bottom, square, and pointed on the end."],
      ["Information that we study (e.g., for research).","The branch of mathematics that analyzes numerical data.","How far a data set spans, the highest element minus the lowest.","The most frequently occuring element of a data set.","All the elements of a data set, divided by the number of elements.","The exact middle of the data set, so that mode is &ge; 50% of the elements, AND &le; 50% of the elements.","An amount that can change.","A graph using pictures to show amounts.","A graph using bars to show amounts.","Part of a graph that shows the meanings of the symbols.","Part of a graph that shows the amounts.","A graph in the shape of a circle, good for showing percentages.","A diagram made of overlapping circles, showing the relationship between two or more variables.","A graph using lines to show amounts. It's good for showing change over time.","A graph that shows two variables on two axes.","The horizontal (lying flat) line of a line graph.","The vertical (standing up) line of a line graph.","Coordinates showing position on a line graph."]
    ];
    examples=[
      ["Apple iMac¥$imac","laptop computer, tablet computer, e-reader","Apple MacBook¥$macbook","Apple MacBook¥$macbook","Apple iPad¥$ipad","Amazon Kindle¥$kindle","mobile phone, smartphone, mp3 player","Gala-kei, smartphone¥$mobilephone","Apple iPhone¥$iphone","Apple iPod¥$ipod",'the "C" key¥$c_key',"$keyboard_1¥$keyboard_2","$screen¥$monitor","$cursor","$mouse","$trackpad","$touchscreen","$cpu","$speaker","$microphone","$usb","$type_c","$port"],
      ["giving commands to a computer, programming","a recipe, a computer program",'press the "x" key','display "x" on the monitor','First "do this", then "do that", next "do the other thing"',"$abstraction","make tea →¥$make_tea","$flowchart","$repetition","$selection"],
      ["The Internet is a kind of network.","The WWW makes information on the Internet searchable.","CIST Website","CIST home page, CIST faculty page, etc.","$html","→ http://","Firefox, Chrome, Safari","Google, Bing","https://www.chitose.ac.jp","$click_here",'<a href="https://www.chitose.ac.jp">Click here</a>'],
      ["","","","","","","","","","","","","","","",""],
      ["","$cat_img","scaling, cropping, rotating, etc.","","","scale up, scale down","$scale_up","$scale_down","$cropping","$rotating","$clockwise","$counter_clockwise","catimage.jpg","catimage.gif","catimage.png","catimage.tiff"],
      ["","","","","","","","","","","","","",""],
      ["","","","","",'<p style=font-family:"Arial";>This font is Arial.</p><p style=font-family:"Courier";>This font is Courier.</p><p style=font-family:"Times New Roman";>This font is Times New Roman.</p>',"<p style=font-size:24px;>This is 24px.</p><p style=font-size:16px;>This is 16px.</p><p style=font-size:10.5px;>This is 10.5px.</p>","<b>Bold characters</b>","<i>Italic characters</i>","<u>Underlined characters</u>"],
      ["Online database such as Internet Movie Database, Grand Comics Database.","Spreadsheet software includes Microsoft Excel, Apple Numbers","","=ROUND(AVERAGE(B3:B13),2)","SUM, AVERAGE, MAX, MIN, IF, ROUND, NOW, etc.","","","","","","","","$line_graph","$bar_graph","$scatter_plot","$pie_chart"],
      ["5, five, V","5¥NOT: five","-3, -2, -1, 0, 1, 2, 3, etc.¥NOT: 1.5, 1/2",'The number "123" has three digits.',"1, 2, ..., 8, 9","10, 11, ..., 98, 99","100, 101, ..., 998, 999","",'In "123", a "3" is in the ones place.','In "123", a "2" is in the tens place.','In "123", "1" is in the hundreds place.',"","","","","","","","1, 2, 3, 4, 5, ...","1st, 2nd, 3rd, 4th, 5th, ...","1st, 2nd, 3rd","4th, 5th, 6th","12th, 13th","20th, 30th","2, 4, 6, 8, 10, ...","1, 3, 5, 7, 9, ..."],
      ["If I join 2 and 3, making 5, that's called addition.","If I add 2 and 3, I'll get 5.","2 + 3 = 5","+",'',"=",'',"13 → 10,3",'"Put down 3, and carry 1".','In the equation "2 + 3 = 5", the "2" and the "3" are addends.','In the equation "2 + 3 = 5", the "5" is the sum.'],
      ["If I take 2 away from 5, making 3, that's called subtraction.","If I subtract 2 from 5, I'll get 3.","-",'','',"26→10+16","",'In the equation "5-3=2", the "2" is the difference.'],
      ["If I join 3 groups of 5, making 15, that's called multiplication.","If I multiply 3 by 5, I'll get 15.","x",'x',"",'In the equation "5x3=15", the "15" is the product.',"The factors of 6 are 1, 2, 3 and 6.","2, 3, 5, 7, 11, etc.","4, 6, 8, 9, 10, 12, etc.","The multiples of 2 are 2, 4, 6, 8, 10, 12, etc."],
      ["If I separate a group of 10 into 2 groups of 5, that's called division.","If I divide 10 by 2, I'll get 5.","÷",'','In the equation "11÷2=5R1", the R1 is a remainder.','In the equation "10÷2=5" the 10 is the dividend.','In the equation "10÷2=5", the 2 is the divisor.','In the equation "10÷2=5", the 5 is the quotient.','"24" is divisible by 1, 2, 3, 4, 6, 8, 12 and 24. Even numbers are divisible by 2.'],
      ["1/2, 1/3, 1/4, etc.","","","","","","", "In the fraction 1/2, the 1 is the numerator.","In the fraction 1/2, the 2 is the denominator.",'The fraction 1/2 can be read "one half" or "one over two".',"2/2, 3/3, 4/4, 5/5, 6/6, 7/7, etc.","1/2 = 2/4","3/2","1(1/2)","If I invert the fraction 2/3, I'll get the fraction 3/2.","3/2 is the reciprocal of 2/3."],
      ["0.75",'In the decimal 0.75, there is a "7" in the tenths place.','In the decimal 0.75, there is a "5" in the hundredths place.',"",'',"50%","%",''],
      ["-1, -2, -3, etc.",'The number "-1" can be read "negative one".','The number "-1" can be read "minus one"','"2&gt;1", "1&lt;2", "x&ge;1", "y&le;1", "x&ne;1", etc.',"&gt;","&lt;","&ge;","&le;","&ne;","&ne;"],
      ["2<sup>5</sup>, 3<sup>4</sup>, 4<sup>3</sup>, 5<sup>2</sup>, etc.",'"In the exponential term 2<sup>5</sup>, the "5" is the exponent."','In the exponential term 2<sup>5</sup>, the "2" is the base number.','The exponential term 5<sup>2</sup> is read, "five squared".','The exponential term 5<sup>2</sup> can also be read, "five to the second power".','The exponential term 4<sup>3</sup> is read, "four cubed".','The exponential term 4<sup>3</sup> can also be read, "four to the third power".','The exponential term 3<sup>4</sup> is read, "three to the fourth power".',"4 is the square of 2.","2 is the square root of 4.","√5","√",'In the radical expression √5, the "5" is the radicand.','The radical expression √5 is read, "the square root of five".',"1, 4, 9, 16, 25, etc."],
      ["","&infin;","","•","$line","$ray","$segment","",'In the notation "90°", the "°" is read "degrees".',"$right_angle","$acute","$obtuse","$parallel","$perpendicular","&cong;"],
      ["triangle, quadrilateral, parallelogram, rectangle, rhombus, etc.","$triangle_1¥$triangle_2","parallelogram, rectangle, rhombus, square, trapezoid, etc.","$parallelogram","$rectangle","$rhombus","$square","$trapezoid","$pentagon_1¥$pentagon_2","$hexagon","$octagon","$circle","$radius","$diameter","$circumference","$area","&pi;","cube, sphere, cylinder, cone, pyramid, etc.","$cube","$sphere","$cylinder","$cone","$pyramid"],
      ["","","In the data set 2, 3, 4; the range is 2 (= 4-2).","In the data set 2, 3, 4, 4; the mode is 4.","In the data set 2, 3, 4; the mean is 3 (= (2+3+4)/3)","In the data set 2, 3, 9; the median is 3.","","$pictograph","$bar_graph","$graph_key","$scale","$pie_chart","$venn_diagram","$line_graph","$scatter_plot","","",'(x,y) e.g., "2,4"']
    ];
  }
}
