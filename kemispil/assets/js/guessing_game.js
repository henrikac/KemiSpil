let score = 0;

// Fisher-Yates Shuffle
// https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
const shuffle = (array) => {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
};

// gets 'numberOfIndexes' random numbers (index-numbers)
const getRandomIndexes = (numberOfIndexes) => {
    const indexes = [];

    for (let i = 0; i < numberOfIndexes; i++) {
        const randomNumber = Math.floor(Math.random() * (alkanes.length - 1));

        if (indexes.indexOf(randomNumber) == -1) {
            indexes.push(randomNumber);
        } else {
            i -= 1;
        }
    }

    return indexes;
};

// turning a formula into a correct looking chemical formula
const writeFormula = (word) => {
    const formula = word.split("");
    let result = "";

    for (let i = 0; i < formula.length; i++) {
        if (parseInt(formula[i]) || formula[i] == "0") {
            result += "<sub>" + formula[i] + "</sub>";
            continue;
        }
        result += formula[i];
    }

    return result;
};

const setChoices = (prop, correctAnswer, numOfChoices) => {
    const listOfOtherAlkanes = alkanes.map(alkane => alkane[prop])
        .filter(others => others != correctAnswer);
    const randomIndexes = getRandomIndexes(numOfChoices);
    const choices = [correctAnswer];
    randomIndexes.map(index => choices.push(listOfOtherAlkanes[index]));

    return shuffle(choices);
};

const createAlkaneCard = (title, choices) => {
    let card = "<div class='card col-10 col-md-5 text-center m-3'>";
    card += "<div class='card-header text-success lead font-weight-bold'>";
    card += writeFormula(title) + "</div>";
    card += "<div class='card-body row justify-content-center'>";
    choices.map(choice => {
        card += "<button class='btn btn-primary col-md-9 col-lg-5 m-3'>";
        card += writeFormula(choice) + "</button>";
    });
    card += "</div></div>";
    return card;
};

const names = alkanes.map(alkane => alkane["name"]);
const formulas = alkanes.map(alkane => alkane["formula"]);

const getTotalIndexes = () => {
    const indexes = [];

    for (let i = 0; i < alkanes.length; i++) {
        indexes.push(i);
    }

    return indexes;
};

const randomOrder = shuffle(getTotalIndexes());

const displayCards = (titles, prop, props, numOfWrongChoices) => {
    $("body").scrollTop();
    for (let i = 0; i < alkanes.length; i++) {
        $("#gameFrame").append(createAlkaneCard(titles[randomOrder[i]], setChoices(prop, props[randomOrder[i]], numOfWrongChoices)));
    }
}

const getUserGuess = (choice) => {
    let guess = choice;
    // checking if e.target is <sub>
    // because if <sub> the 'const question' will return textContent error
    if (guess.prop("tagName") == "SUB") {
        guess = guess.parent();
    }

    return guess;
};

const responseToGuess = (answer, userGuess) => {
    if (answer && userGuess.hasClass("btn-primary")) {
        userGuess.removeClass("btn-primary").addClass("btn-success");
        userGuess.siblings().each((i, child) => {
            if (!$(child).hasClass("btn-success")) {
                $(child).attr("disabled", true);
            }
        });
        $("#score").text(score += 1);
    } else if (!answer && userGuess.hasClass("btn-primary")) {
        // if the clicked button is NOT the right answer
        // turn clicked buttons background to red and decrement 'score' by 1
        userGuess.removeClass("btn-primary").addClass("btn-danger");
        $("#score").text(score -= 1);
    }
};

const allCardsGame = () => {
    $(".btn-primary").css("cursor", "pointer")
        .on("click", function () {
            let correctGuess = false;
            const guess = getUserGuess($(this));
            const question = guess.parent().prev().text();

            // looping through the alkanes array to see if the clicked button contains the right answer
            $(alkanes).each(index => {
                if ((alkanes[index]["name"] == question && alkanes[index]["formula"] == guess.text()) ||
                    (alkanes[index]["formula"] == question && alkanes[index]["name"] == guess.text())) {
                    correctGuess = true;
                }
            });

            responseToGuess(correctGuess, guess);
        });
};

const singleCardGame = () => {
    // displays the first alkaneCard
    $(".card").first().css("display", "");

    $(".btn-primary").css("cursor", "pointer")
        .on("click", function () {
            let correctGuess = false;
            const guess = getUserGuess($(this));
            const question = guess.parent().prev().text();

            // looping through the alkanes array to see if the clicked button contains the right answer
            $(alkanes).each(index => {
                if ((alkanes[index]["name"] == question && alkanes[index]["formula"] == guess.text()) ||
                    (alkanes[index]["formula"] == question && alkanes[index]["name"] == guess.text())) {
                    const alkaneCard = guess.parent().parent();
                    correctGuess = true;

                    // if the alkaneCard don't have the class 'guessed'
                    if (!alkaneCard.hasClass("guessed")) {
                        // adds the class 'guessed' to the card and hide the card
                        // then display the next card
                        alkaneCard.addClass("guessed").hide().next().css("display", "");
                        // if the 'next' item don't have the class 'card'
                        // then we assume there are no more cards
                        // then display all the cards for the user to see the result
                        if (!alkaneCard.next().hasClass("card")) {
                            $(".card").css("display", "");
                        }
                    }
                }
            });

            responseToGuess(correctGuess, guess);
        });
};

$(document).ready(function() {
    switch (true) {
        case params[0] == 1 && params[1] == "navne":
            displayCards(formulas, "name", names, 3);
            allCardsGame();
            break;
        case params[0] == 1 && params[1] == "formler":
            displayCards(names, "formula", formulas, 3);
            allCardsGame();
            break;
        case params[0] == 2 && params[1] == "navne":
            displayCards(formulas, "name", names, 3);
            $(".card").hide();
            singleCardGame();
            break;
        case params[0] == 2 && params[1] == "formler":
            displayCards(names, "formula", formulas, 3);
            $(".card").hide();
            singleCardGame();
            break;
        case params[0] == 3 && params[1] == "navne":
            displayCards(formulas, "name", names, 9);
            allCardsGame();
            break;
        case params[0] == 3 && params[1] == "formler":
            displayCards(names, "formula", formulas, 9);
            allCardsGame();
            break;
        case params[0] == 4 && params[1] == "navne":
            displayCards(formulas, "name", names, 9);
            $(".card").hide();
            singleCardGame();
            break;
        case params[0] == 4 && params[1] == "formler":
            displayCards(names, "formula", formulas, 9);
            $(".card").hide();
            singleCardGame();
            break;
    }
});