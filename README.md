<h1>Bench Manager App </h1>

<h2> About this app </h2>
<p> I created this app for use by Roller Derby coaches during games in order to simplify the process of managing lines for each jam. <br>
For those who are unfamiliar, Roller Derby is a full-contact sport played on skates on an oval-shaped track. Games are broken up into two-minute "jams", during which 5 skaters from each team are on the track - 4 blockers and 1 jammer. The jammers job, in a nutshell, is to get past the blockers of the opposing team.</p> <br>
<h2> The Problem </h2>
<p>Each jam is separated by a 30 second break, during which one of the team's coaches (typically a designated 'bench manager') will have to select the next 5 skaters to go onto the track for the next jam. Normally the coaches will have pre-set 'lines' decided on in advance of the game, which will be sent out in order. However, various factors can complicate this process. </p><br>
<h4>Penalties</h4>
Most significantly, if a skater receives a penalty during a jam, she sits for 30 seconds in the penalty box. If she is still there at the end of the jam, the penalty time carries over and she must skate in the next jam. Therefore the bench coach must send out one less skater. Often the coach must think quickly in order to decide which skater to omit from the next line. When doing this it is important to consider carefully who to 'sit' for the jam in order to minimize the impact of the penalty. <br>
The coach may choose to sit a skater who has a similar style of play to the skater with the penalty, since the skater on the track can act as something of a replacement for her when she returns to the track. They may also work from a rotational system, whereby skaters who have played more jams are chosen to sit, for the sake of fairness. This is more common in low-level games or scrimmages, where always playing the strongest line is not a priority. <br>
<h4> Injuries</h4>
Another factor which can mess with the line rotation is injuries. A player may inform the coach at any given time that she <em>needs</em> to sit in order to catch her breath, rest a minor injury or fix her gear. She also may be removed from the game altogether for an injury. Furthermore, if a jam is ever called off by the referees over concern for a skater who is downed, she is required by the rules set to sit for the next 3 jams. In this case, someone must be pulled in to replace her in her line, with the same factors as above potentially influencing the decision. <br>
<h4>Foul-Outs and Ejections</h4>
If a skater receives 7 penalties, or receives one particularly egregious contact penalty, she will be removed from the game and no longer be permitted to play or sit on the bench. So sometimes a Bench Manager will have to deal with the permanent removal of a skater from her line(s) mid-game. A bench manager may also choose to limit the play-time of a skater who is headed towards 7 penalties, to mitigate the risk of a foul-out.

<h2> The Solution</h2>
The first time I ever volunteered to bench manage, I was very conscious that these problems would arise. I therefore quickly created this app to help me deal with these situations under pressure. Before the game starts, the coaches have the opportunity to input the roster of skaters and specify various attributes of each player. For instance, whether she is a blocker or jammer or both, what her strengths are (agility, size, experience etc). The user then specifies the skaters making up each line. All of this information is submitted once confirmed. The app makes use of localStorage so that the roster and lines will be 'remembered' even if the user refreshes the page or leaves the page temporarily. (They may wish to 'simulate' gameplay beforehand).

<h4>Managing Penalties</h4>
At any point during the game we have two lists in view. One represents the line of skaters currently on the track while the other represents those who are 'on deck' and will move onto the track at the end of this jam. If the jam ends and a skater is in the box, the user can mark this beside their name. The app will then automatically suggest which skater from the next line should sit. This is based on which skater is most similar to the one in the box. The play-time of the skaters will also be considered, however. If someone has already sat three times, then it may be a better/fairer choice to sit another skater.

<h4>Managing Injuries and Voluntary Sits</h4>
If a skater chooses to sit or has to sit for some other reason, the user can mark this on the list of skaters on deck. The app then automatically generates candidates to replace them. This is a similar process to choosing a skater to sit for a penalty - it will look for similar skaters and prioritise those with less play-time.

<h4>Constraints</h4>
There are various specific constraints to be accounted for when selecting replacement skaters and moving lines around. These include:
<ul>
  <li>Having a skater 'double' (play two jams in a row) should be avoided where possible. </li>
  <li>Skaters should never be asked to 'triple'</li>
  <li>Having a jammer double is not permitted (unless unavoidable due to penalty)</li>
</ul>

<h2> Usage </h2>
The focus of this web app is to minimize the effort and thought required by the bench manager during gameplay. The gameplay view is intended to be simultaneously as simple as possible while allowing maximum functionality. For reference, a list of stats for each skater is also displayed, so that if a skater is missing out on play-time severely this is visible to the coach. At the end of the game, all the data collected during the game also may be useful for the purpose of digging into stats on lines.
The device used is assumed to be a tablet since mobile devices will likely be too small to use efficiently.
