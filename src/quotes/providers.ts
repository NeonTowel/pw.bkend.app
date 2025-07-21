/// <reference types="@cloudflare/workers-types" />

export interface Quote {
  sentence: string;
}

export interface QuoteProvider {
  name: string;
  getQuote(): Promise<Quote>;
  getQuotes(count: number): Promise<Quote[]>;
}

interface GameOfThronesQuote {
  sentence: string;
  character: {
    name: string;
    slug: string;
    house: {
      name: string;
      slug: string;
    }
  }
}

export class GameOfThronesQuoteProvider implements QuoteProvider {
  name = 'Game of Thrones';
  private readonly apiUrl = 'https://api.gameofthronesquotes.xyz/v1/random';

  async getQuote(): Promise<Quote> {
    const quotes = await this.getQuotes(1);
    return quotes[0];
  }

  async getQuotes(count: number): Promise<Quote[]> {
    if (count === 1) {
      const response = await fetch(this.apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch quote from Game of Thrones Quotes API');
      }
      const data: GameOfThronesQuote = await response.json();
      return [{ sentence: data.sentence }];
    }

    const response = await fetch(`${this.apiUrl}/${count}`);
    if (!response.ok) {
      throw new Error('Failed to fetch quotes from Game of Thrones Quotes API');
    }
    const data: GameOfThronesQuote[] = await response.json();
    return data.map(item => ({ sentence: item.sentence }));
  }
}

const ronSwansonQuotes = [
"Clear alcohols are for rich women on diets.",
    "Crying: acceptable at funerals and the Grand Canyon.",
    "I call this turf 'n' turf. It's a 16 oz T-bone and a 24 oz porterhouse. Also, whiskey and a cigar. I am going to consume all of this at the same time because I am a free American.",
    "Under my tutelage, you will grow from boys to men. From men into gladiators. And from gladiators into Swansons.",
    "I'm a simple man. I like pretty, dark-haired women, and breakfast food.",
    "Never half-ass two things. Whole-ass one thing.",
    "[On bowling] Straight down the middle. No hook, no spin, no fuss. Anything more and this becomes figure skating.",
    "I don't want to paint with a broad brush here, but every single contractor in the world is a miserable, incompetent thief.",
    "Fishing relaxes me. It's like yoga, except I still get to kill something.",
    "No home is complete without a proper toolbox. Here's April and Andy's: A hammer, a half eaten pretzel, a baseball card, some cartridge that says Sonic and Hedgehog, a scissor half, a flashlight filled with jellybeans.",
    "Just give me all the bacon and eggs you have. Wait...wait. I worry what you just heard was: Give me a lot of bacon and eggs. What I said was: Give me all the bacon and eggs you have. Do you understand?",
    "When people get a little too chummy with me I like to call them by the wrong name to let them know I don't really care about them.",
    "There's only one thing I hate more than lying: skim milk. Which is water that's lying about being milk.",
    "The government is a greedy piglet that suckles on a taxpayer's teat until they have sore, chapped nipples.",
    "The less I know about other people's affairs, the happier I am. I'm not interested in caring about people. I once worked with a guy for three years and never learned his name. Best friend I ever had. We still never talk sometimes.",
    "When I eat, it is the food that is scared.",
    "My only official recommendations are US Army-issued mustache trimmers, Morton's Salt, and the C.R. Lawrence Fein two inch axe-style scraper oscillating knife blade.",
    "Are you going to tell a man that he can't fart in his own car?",
    "Turkey can never beat cow.",
    "It's always a good idea to demonstrate to your coworkers that you are capable of withstanding a tremendous amount of pain.",
    "There are three acceptable haircuts: high and tight, crew cut, buzz cut.",
    "Capitalism: God's way of determining who is smart and who is poor.",
    "Any dog under fifty pounds is a cat and cats are useless.",
    "Fish, for sport only, not for meat. Fish meat is practically a vegetable.",
    "There is only one bad word: taxes.",
    "History began July 4th, 1776. Anything before that was a mistake.",
    "Cultivating a manly musk puts opponent on notice.",
    "Give a man a fish and feed him for a day. Don't teach a man to fish… and feed yourself. He's a grown man. And fishing's not that hard.",
    "Child labor laws are ruining this country.",
    "Great job, everyone. The reception will be held in each of our individual houses, alone.",
    "America: The only country that matters. If you want to experience other ‘cultures,’ use an atlas or a ham radio.",
    "The key to burning an ex-wife effigy is to dip it in paraffin wax and then toss the flaming bottle of isopropyl alcohol from a safe distance. Do not stand too close when you light an ex-wife effigy.",
    "There are only three ways to motivate people: money, fear, and hunger.",
    "Shorts over six inches are capri pants, shorts under six inches are European.",
    "Friends: one to three is sufficient.",
    "Breakfast food can serve many purposes.",
    "Honor: if you need it defined, you don't have it.",
    "One rage every three months is permitted. Try not to hurt anyone who doesn't deserve it.",
    "Strippers do nothing for me…but I will take a free breakfast buffet anytime, anyplace.",
    "I like saying 'No,' it lowers their enthusiasm.",
    "You had me at meat tornado.",
    "There must be a mistake, you've accidentally given me the food that my food eats.",
    "Son, there is no wrong way to consume alcohol.",
    "Keep your tears in your eyes where they belong.",
    "I've cried twice in my life. Once when I was seven and hit by a school bus. And then again when I heard that Li'l Sebastian has passed.",
    "I hate everything.",
    "I love nothing.",
    "I love riddles!",
    "Don't waste energy moving unless necessary.",
    "I'll take that steak to go. Please and thank you.",
    "Creativity is for people with glasses who like to lie.",
    "Children are terrible artists and artists are crooks.",
    "Tom put all my records into this rectangle!",
    "I believe luck is a concept invented by the weak to explain their failures.",
    "What's cholesterol?",
    "People who buy things are suckers.",
    "I'm going to get 12 eggs and part of a dead animal. Dealer's choice. Please and thank you.",
    "I wanna punch you in the face so bad right now.",
    "Normally, if given the choice between doing something and nothing, I'd choose to do nothing. But I will do something if it helps someone else do nothing. I'd work all night, if it meant nothing got done.",
    "Dear frozen yogurt, you are the celery of desserts. Be ice cream or be nothing. Zero stars.",
    "There has never been a sadness that can't been cured by breakfast food.",
    "If any of you need anything at all, too bad. Deal with your problems yourselves, like adults.",
    "It's pointless for a human to paint scenes of nature when they can go outside and stand in it.",
    "On my deathbed, my final wish is to have my ex-wives rush to my side so I can use my dying breath to tell them both to go to hell one last time.",
    "I was born ready. I'm Ron F*cking Swanson.",
    "Don't start chasing applause and acclaim. That way lies madness.",
    "If there were more food and fewer people, this would be a perfect party.",
    "Put some alcohol in your mouth to block with words from coming out.",
    "Give 100%. 110% is impossible. Only idiots recommend that.",
    "Birthdays were invented by Hallmark to sell cards.",
    "Sting like a bee. Do not float like a butterfly. That's ridiculous.",
    "My first ex-wife's name is Tammy. My second ex-wife's name is Tammy. My Mom's name is Tamara…she goes by Tammy.",
    "Do you have any history of mental illness in your family? I have an uncle who does yoga.",
    "The whole point of this country is if you want to eat garbage, balloon up to 600 pounds and die of a heart attack at 43, you can! You are free to do so. To me, that's beautiful.",
    "Capitalism is the only way … It makes America great, England OK and France terrible.",
    "Veganism is the sad result of a morally corrupt mind. Reconsider your life.",
    "Barbecues should be about one thing: good shared meat.",
    "Well, I am not usually one for speeches. So, goodbye.",
    "I regret nothing. The end.",
    "I like Tom. He doesn't do a lot of work around here. He shows zero initiative. He's not a team player. He's never wanted to go that extra mile. Tom is exactly what I'm looking for in a government employee.",
    "I enjoy government functions like I enjoy getting kicked in the nuggets with a steel toed boot.",
    "I like some changes. Like when I change a tree into a canoe, or a wife into an ex-wife.",
    "I've had the same haircut since 1978 and I've driven the same car since 1991. I've used the same wooden comb for three decades. I have one bowl. I still get my milk delivered by horse.",
    "I leave no meat behind. It's an honor thing.",
    "An hour ago a giant fireball consumed my entire face and it was far preferable to spending another second with you.",
    "Go back to the library where you belong.",
    "Once a year, every branch of this government meets in a room and announces what they intend to waste taxpayer money on.",
    "Every time she laughs, an angel dies. Even telemarketers avoid her. Her birth was payback for the sins of man. But you know the worst thing about her? She works for the library.",
    "Say what you want about organized religion, but those bastards knew how to construct an edifice.",
    "I change my locks every 16 days.",
    "It's an impossible puzzle, and I love puzzles!",
    "Is Star Wars the one with the wizard boy?",
    "My son is several weeks old. He is very familiar with the sound of power tools.",
    "Live your life how you want, but don't confuse drama with happiness.",
    "In my opinion, not enough people have looked their dinner in the eyes and considered the circle of life.",
    "If it doesn't have meat, it's a snack.",
    "An ideal night out, to me, is stepping onto my porch area and grilling up a thick slab of something’s flesh and then popping in a highlight real from the WNBA.",
    "On nights like this when the cold winds blow, the air is awash in the swirling eddies of our dream, come with me and find safe haven in a warm bathtub full of my jazz.",
    "First rule. No conversation lasts longer than 100 total words.",
    "I will leave my children $50 a piece. Enough for the cab ride home from the funeral and a steak dinner. End of discussion.",
    "The three most useless jobs in the world in order are: lawyer, congressman, and doctor.",
    "I've had the same will since I was 8 years old. Upon my death, I will transfer all of my belongings to the man or animal who has killed me.",
    "Standard birth control methods are usually ineffective against a Swanson.",
    "I believe in cutting useless government projects. I also believe in cutting useful government projects.",
    "I've never been hungover. After I've had too much whiskey, I cook myself a large flank steak, pan fried and salted butter. I eat that, put on a pair of wet socks and go to sleep.",
    "Every two weeks I need to sand down my toe nails. They're too strong for clippers.",
    "We have one activity planned: not getting killed.",
    "When I'm done eating a Mulligan's meal, for weeks afterwards, there are flecks of meat in my mustache. And I refuse to clean it because every now and then a piece of meat will fall into my mouth.",
    "Please and thank you."
  ];

export class RonSwansonQuoteProvider implements QuoteProvider {
  name = 'Ron Swanson';
  getQuote(): Promise<Quote> {
    const sentence = ronSwansonQuotes[Math.floor(Math.random() * ronSwansonQuotes.length)];
    return Promise.resolve({ sentence });
  }

  getQuotes(count: number): Promise<Quote[]> {
    const quotes: Quote[] = [];
    for (let i = 0; i < count; i++) {
      quotes.push({ sentence: ronSwansonQuotes[Math.floor(Math.random() * ronSwansonQuotes.length)] });
    }
    return Promise.resolve(quotes);
  }
}

interface DadJoke {
  id: string;
  joke: string;
  status: number;
}

export class DadJokeQuoteProvider implements QuoteProvider {
  name = 'I Can Haz Dad Joke';
  private readonly apiUrl = 'https://icanhazdadjoke.com/';
  private readonly userAgent = 'pw.bkend.app (https://github.com/NeonTowel/pw.bkend.app)';

  async getQuote(): Promise<Quote> {
    const response = await fetch(this.apiUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': this.userAgent,
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch quote from ICanHazDadJoke API');
    }
    const data: DadJoke = await response.json();
    return { sentence: data.joke };
  }

  async getQuotes(count: number): Promise<Quote[]> {
    const quotes: Quote[] = [];
    for (let i = 0; i < count; i++) {
      quotes.push(await this.getQuote());
    }
    return quotes;
  }
}

const starWarsQuotes = [
  "A long time ago in a galaxy far, far away…",
  "I've been waiting for you, Obi-Wan. We meet again, at last. The circle is now complete. When I left you, I was but the learner; now I am the master.",
  "The Force is strong with this one.",
  "No. You're coming with me. I'll not leave you here, I've got to save you.",
  "You already…have, Luke. You were right. You were right about me. Tell your sister…you were right.",
  "No. I am your father.",
  "I find your lack of faith disturbing",
  "If you only knew the power of the dark side.",
  "Be careful not to choke on your aspirations.",
  "You have failed me for the last time.",
  "You have controlled your fear. Now, release your anger. Only your hatred can destroy me.",
  "Remember…the Force will be with you, always.",
  "Use the Force, Luke.",
  "You were the chosen one! It was said that you would destroy the Sith, not join them. You were to bring balance to the Force, not leave it in darkness.",
  "Be mindful of your thoughts Anakin. They'll betray you.",
  "In my experience, there's no such thing as luck.",
  "Your eyes can deceive you, don't trust them.",
  "You were my brother, Anakin. I loved you.",
  "Who's the more foolish: the fool, or the fool who follows him?",
  "Don't give in to hate. That leads to the Dark Side.",
  "Why do I get the feeling you're going to be the death of me?",
  "Dreams pass in time.",
  "I have a bad feeling about this.",
  "Traveling through hyperspace ain't like dusting crops, farm boy.",
  "Never tell me the odds!",
  "Chewie, we're home.",
  "Great, kid. Don't get cocky.",
  "Women always figure out the truth.",
  "Laugh it up, fuzzball.",
  "You know, sometimes I amaze even myself.",
  "Don't everybody thank me at once.",
  "Let's keep a little optimism here.",
  "Judge me by my size, do you?",
  "Do. Or do not. There is no try.",
  "Fear is the path to the dark side.",
  "Fear leads to anger, anger leads to hate, hate leads to suffering.",
  "Once you start down the dark path, forever will it dominate your destiny.",
  "In a dark place we find ourselves, and a little more knowledge lights our way.",
  "Size matters not.",
  "Wars not make one great.",
  "A Jedi uses the Force for knowledge and defense, never for attack.",
  "You must unlearn what you have learned.",
  "When 900 years old you reach, look as good you will not.",
  "I was raised to do one thing, but I've got nothing to fight for.",
  "That's one hell of a pilot!",
  "Rebel scum.",
  "I won't fail you. I'm not afraid.",
  "I've seen this raw strength only once before. It didn't scare me enough then. It does now.",
  "You'll find I'm full of surprises.",
  "Strike me down in anger and I'll always be with you, just like your father.",
  "No one's ever really gone.",
  "Confronting fear is the destiny of a Jedi. Your destiny.",
  "The Force is not a power you have. It's not about lifting rocks. It's the energy between all things, a tension, a balance, that binds the universe together.",
  "I'm rather embarrassed, General Solo, but it appears that you are to be the main course at a banquet in my honor.",
  "We seem to be made to suffer. It's our lot in life.",
  "We're doomed.",
  "Taking one last look, sir, at my friends.",
  "He's quite clever, you know...for a human being.",
  "Help me, Obi-Wan Kenobi. You're my only hope.",
  "She was more interested in protecting the Light than seeming like a hero.",
  "I'd just as soon kiss a Wookiee.",
  "Somebody has to save our skins. Into the garbage chute, flyboy.",
  "Will somebody get this big walking carpet out of my way?",
  "Some day you're gonna be wrong, I just hope I'm there to see it.",
  "Get your head out of your cockpit.",
  "Attachment is forbidden. Possession is forbidden. Compassion, which I would define as unconditional love, is essential to a Jedi’s life. So you might say, that we are encouraged to love.",
  "You're asking me to be rational. That is something that I know I cannot do. Believe me, I wish I could just wish away my feelings, but I can't.",
  "Someday I will be the most powerful Jedi ever.",
  "Mom, you said that the biggest problem in this universe is nobody helps each other.",
  "Something inside me has always been there, but now it's awake.",
  "I need someone to show me my place in all of this.",
  "Light. Darkness. A balance.",
  "People keep telling me they know me. No one does.",
  "I've seen your daily routine. You are not busy.",
  "I think I can handle myself.",
  "I know what I have to do.",
  "Let the past die. Kill it.",
  "It's not a problem if you don't look up.",
  "Rebellions are built on hope.",
  "So this is how liberty dies...with thunderous applause.",
  "What if the democracy we thought we were serving no longer exists, and the Republic has become the very evil we have been fighting to destroy?",
  "I'm not afraid to die. I've been dying a little bit each day since you came back into my life.",
  "To be angry is to be human.",
  "As long as he lives, hope lives.",
  "There has been an awakening. Have you felt it?",
  "You can't stop change any more than you can stop the suns from setting.",
  "Now, be brave, and don't look back.",
  "The Force, it's calling to you. Just let it in.",
  "Dear child, the belonging you seek is not behind you...it is ahead.",
  "We're not alone. Good people will fight if we lead them.",
  "Remember, Your focus determines your reality.",
  "I sense great fear in you, Skywalker. You have hate. You have anger. But you don't use them.",
  "I'm just a simple man trying to make my way in the universe.",
  "I'm one with the Force. The Force is with me.",
  "That's how we're gonna win. Not fighting what we hate, saving what we love.",
  "Long have I waited, and now your coming together is your undoing.",
  "How wude!",
  "Save the Rebellion! Save the dream.",
  "He's no good to me dead.",
  "Here goes nothing.",
  "I find that answer vague and unconvincing.",
  "live long and prosper",
  "Use the force Harry!",
  "What's Padme bringing to the BBQ?",
  "cross tagline Yoda of BORG am I. Futile is resistance...assimilate you I will.",
  "... May the BuildON be with you on this May the 4th! AWS and Lambda - your lightsabers to wield the power of the Force in serverless computing. DynamoDB - your trusted droid to store your data stronger than a Wookiee. Join the rebel alliance of cloud computing and celebrate Star Wars Day with the ultimate tools for success. Happy May the 4th, young padawan! ... ",
  "Something, something....Darkside!!",
  "Beware on this May 4th, for the dark side of AWS CodeWhisper looms. A group of developers worked late at the Rebellion's secret base, only to be threatened by the CodeWhisperer, who demanded allegiance to the dark side of the cloud. But with the power of the BuildON, they overcame and vanquished the threat. May the 4th be with you, and always remember to secure your AWS applications from the CodeWhisperer's grasp!",
  "Why did the AWS CodeWhisperer switch to using AWS CDK? Because he heard it was easier to construct a Death Star with infrastructure as code!",
  "Yoda Leaves For Dagobah \"'Failed I Have, Into Exile I Must Go.'\""
];

export class StarWarsQuoteProvider implements QuoteProvider {
  name = 'Star Wars';
  getQuote(): Promise<Quote> {
    const sentence = starWarsQuotes[Math.floor(Math.random() * starWarsQuotes.length)];
    return Promise.resolve({ sentence });
  }

  getQuotes(count: number): Promise<Quote[]> {
    const quotes: Quote[] = [];
    for (let i = 0; i < count; i++) {
      quotes.push({ sentence: starWarsQuotes[Math.floor(Math.random() * starWarsQuotes.length)] });
    }
    return Promise.resolve(quotes);
  }
}

import lotrQuotes from './lotr-quotes.json';

interface LotrQuote {
  id: number;
  char: string;
  dialog: string;
  movie: string;
}

export class LotrQuoteProvider implements QuoteProvider {
  name = 'Lord of The Rings';
  private quotes: LotrQuote[] = lotrQuotes;

  getQuote(): Promise<Quote> {
    const quote = this.quotes[Math.floor(Math.random() * this.quotes.length)];
    return Promise.resolve({ sentence: quote.dialog });
  }

  getQuotes(count: number): Promise<Quote[]> {
    const quotes: Quote[] = [];
    for (let i = 0; i < count; i++) {
      const quote = this.quotes[Math.floor(Math.random() * this.quotes.length)];
      quotes.push({ sentence: quote.dialog });
    }
    return Promise.resolve(quotes);
  }
} 