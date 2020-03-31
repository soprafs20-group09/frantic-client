import React from 'react';

const specialCards = [
    "2nd-chance", "counterattack", "equality",
    "exchange", "fantastic", "fantastic-four",
    "fuck-you", "gift", "nice-try", "skip"
];
const events = [
    "charity", "communism", "doomsday",
    "earthquake", "expansion", "finish-line",
    "friday-the-13th", "gambling-man", "market",
    "mating-season", "merry-christmas",
    "mexican-standoff", "recession", "robin-hood",
    "surprise-party", "the-all-seeing-eye",
    "third-time-lucky", "time-bomb", "tornado",
    "vandalism"
];
const colors = [
    'red',
    'yellow',
    'green',
    'blue'
];

const multicolorCards = [
    'fantastic',
    'fantastic-four',
    'equality',
    'counterattack',
    'nice-try',
    'fuck-you'
];
const multinumberCards = [
    'fantastic',
    'fantastic-four',
];
const specialCardHelp = {
    "2nd-chance":
        <p>
            The player <u>has to</u> play another card on top of "2nd
            Chance". The same game rules apply (colour on
            colour, colourless Special Cards etc.). If he cannot
            play a card from his hand, he has to draw one from
            the deck
        </p>,
    "counterattack":
        <p>
            As soon as a Special Card is played against a player,
            this card can be thrown in instantly by the victim.
            The effect is cancelled and the player of "Counterattack"
            can redirect it to another player. The target
            of the freshly obtained effect is freely choosable.
            The game round continues with the player of the
            initial Special Card.
            <br/>
            <strong>Important:</strong> It is also possible to forward or counter
            an attack that has already been redirected.
        </p>,
    "equality":
        <p>
            The player of this card chooses a fellow player who
            holds fewer cards than himself in his hands. This
            player has to draw as many cards until their number
            of cards is equal.
        </p>,
    "exchange":
        <p>
            The player of this card gives another player two
            cards of his choice from his hand and in exchange
            has to blindly draw two cards from his opponent.
            <br/>
            <strong>Exception:</strong> If the player of this card or his opponent
            holds less than two cards in their hands, then less
            cards are being exchanged (e.g. two cards against
            one). Should someone play this card as his last, he
            still has to draw two cards from an opponent.
        </p>,
    "fantastic":
        <p>
            "Fantastic" can be played on any card. You can
            choose a number or a colour.
        </p>,
    "fantastic-four":
        <p>
            The player of this card chooses a person, who in return has to draw four cards from the deck. It is also
            possible to determine multiple players and divide
            the four cards between them
        </p>,
    "fuck-you":
        <p>
            You can only dismiss the "Fuck You" card, when
            you have <i>exactly ten cards</i> in your hand,
            including "Fuck You". The round continues with the card
            played before "Fuck You".
            <br/>
            <strong>Important:</strong> The "Fuck You" card can only be blindly
            obtained by an opponent and not be willingly given.
            <br/>
            <strong>Exception:</strong> During certain Event Cards it can be
            thrown away or passed on.
        </p>,
    "gift":
        <p>
            The player of this card gives two cards from his
            hand to another player.
            <br/>
            <strong>Exception:</strong> If you only hold one card in your hand,
            you're only able to give away one card.
            If "Gift" is played as the last card the player still
            has to choose a target.
        </p>,
    "nice-try":
        <p>
            As soon as a player got rid of all his hand cards and
            therefore ends the current round, this card can be
            thrown in immediately. Even if a player has just received this card (e.g. "Gift").
            The player who ended the round then needs
            to draw three cards and the game round continues.
            <br/>
            <strong>Important:</strong> If multiple players finish off their cards
            (e.g. Event Card "Recession") and "Nice Try" is
            played, every player who finished has to draw three
            cards.
        </p>,
    "skip":
        <p>
            The player of this card chooses a fellow player, who
            is suspended for one turn.
            <br/>
            <strong>Important:</strong> A player can only be skipped again, after
            he already suspended his last turn.
        </p>
};
const eventCardHelp = {
    "charity":
        <p>
            Every player has to pick one card from the player
            with the most hand cards.
            <br/>
            <strong>Important:</strong> If two or more players have an equal
            amount of most cards, cards are picked from all of
            them. These players don't have to draw cards from
            each other.
        </p>,
    "communism":
        <p>
            Everyone has to draw as many cards to equal the
            player, who holds the most cards in his hand.
        </p>,
    "doomsday":
        <p>
            The game round is immediately over. Every player
            receives 50 points.
        </p>,
    "earthquake":
        <p>
            Every player gives his cards to the player to his
            right.
        </p>,
    "expansion":
        <p>
            The players have to draw cards from the deck accordingly: The 1st player draws one card, the 2nd
            draws two, the 3rd three and so on.
        </p>,
    "finish-line":
        <p>
            The game round is immediately over and the players
            count their points according to their hand cards.
        </p>,
    "friday-the-13th":
        <p>
            It's Friday, the Thirteenth. A hook-handed murderer
            is among us!
            <br/>
            But just in the movies, it's a totally boring, normal
            Friday, nothing weird happens. The game round
            continues without further ado.
        </p>,
    "gambling-man":
        <p>
            Every player has to place a preferably low Numeral
            Card of the last played colour face down. All cards
            are simultaneously turned around. The player with
            the highest digit has to take the other cards in.
            Players without Numeral Cards of said colour have
            to draw two cards as penalty.
            <br/>
            <strong>Important:</strong> If no colour has been played so far, the
            event is ineffective.
        </p>,
    "market":
        <p>
            As many cards as there are players, the top cards
            from the deck are turned face up in front of the
            players. The players then pick in turn one card to
            take in their hands.
        </p>,
    "mating-season":
        <p>
            Every combination that can be achieved with Numeral Cards have to be disposed of. Combinations
            would be pairs, three of a kind, four of a kind and so
            on. The colour of the cards doesn't matter.
        </p>,
    "merry-christmas":
        <p>
            Every player has to give all of their hand cards to
            other players. They can divide them as they please.
        </p>,
    "mexican-standoff":
        <p>
            All players dispose of their cards and draw in turn
            three new cards from the deck.
        </p>,
    "recession":
        <p>
            The players have to dispose of cards from their
            hands accordingly: The 1st player has to dispose of
            one card, the 2nd disposes of two, the 3rd of three
            and so on.
        </p>,
    "robin-hood":
        <p>
            The player with the smallest amount of hand cards
            swaps his cards with the player who holds the most.
        </p>,
    "surprise-party":
        <p>
            Every player must give one of their cards to a player
            of their choosing.
        </p>,
    "the-all-seeing-eye":
        <p>
            Every player has to show their cards. The cards are
            exposed until every player gives his OK to continue.
        </p>,
    "third-time-lucky":
        <p>
            Every player has to draw three cards
        </p>,
    "time-bomb":
        <p>
            Every player has only three turns left. The round
            ends when a player would reach his fourth turn.
            If a player can dispose of all his cards before the
            fourth turn, he gets credited ten points. The other
            players get a penalty of ten points.
            <br/>
            If no one is able to diffuse the bomb, the round is
            over and the points in this round get doubled.
        </p>,
    "tornado":
        <p>
            The hand cards of all players are put together,
            shuffled and one at a time newly distributed by the
            player of the Black Card.
        </p>,
    "vandalism":
        <p>
            Every player has to dispose of every card (Numeral
            and Special Cards) of the last played colour.
            <br/>
            <strong>Important:</strong> If no colour has been played so far, the
            event is ineffective.
        </p>
};
const numberHelp =
    <p>
        Number Cards can be played on number and colour on colour.
        <br/>
        Black Cards are not Coloured Cards. Black Cards cannot be
        played on each other. They can only be played on the same
        number or if said number has been wished for. Black cannot
        be wished for as a colour.
        <br/>
        <strong>Black cards activate an event!</strong>
    </p>;

function getAllSpecialCards() {
    let cards = [];
    for (let sc of specialCards) {
        cards.push({
            type: 'special',
            value: sc,
            color: getRandomColor()
        });
    }
    return cards;
}

function getAllEventCards() {
    let cards = [];
    for (let e of events) {
        cards.push({
            type: 'event',
            value: e
        });
    }
    return cards;
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}

function isMulticolor(value) {
    return multicolorCards.indexOf(value) >= 0;
}

function isMultinumber(value) {
    return multinumberCards.indexOf(value) >= 0;
}

function getHelpFromCard(card) {
    let help = {
        multicolor: isMultinumber(card.value),
        multinumber: isMultinumber(card.value),
    };

    switch (card.type) {
        case 'number':
            help.title = "Number Cards";
            help.description = numberHelp;
            break;
        case 'special':
            help.title = card.value.replace(/-/g, ' ');
            help.description = specialCardHelp[card.value];
            break;
        case 'event':
            help.title = card.value.replace(/-/g, ' ');
            help.description = eventCardHelp[card.value];
            break;
    }

    return help;
}

export default {
    getAllSpecialCards,
    getAllEventCards,
    isMulticolor,
    isMultinumber,
    getHelpFromCard
}