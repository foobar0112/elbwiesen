const poems = [
    [
        "jeden tag ,",
        "johannes , sitzt du",
        "an der elbe . und zugleich",
        "fließen den",
        "sommer hinab",
        "die ereignisse . entfliehen und",
        "tanzen zum",
        "rauschen der",
        "laufenden stunden",
        "willst du .",
        "und dass ruhe kommt",
        "vor jedes",
        "auf jedes",
        "warten . stört das",
        "licht darauf im moment ? alles geht weiter .",
        "und du wartest auf die vögel , johannes ..."
    ],
    [
        "auch ich tue nichts und",
        "ver stumm",
        "den sommer über .",
        "unter dem himmel",
        "und den vögeln singen den",
        "wichtigen dingen andere",
        "ein schöneres lied !",
        "beim atmen und",
        "träumen gibt es nicht",
        "die möglichkeit , kurz aufzuhören .",
        "wir wollen uns",
        "bewegen .",
        "zwischen den bäumen",
        "laufen den stunden",
        "minuten wie wasser",
        "davon und ziehen dich voran ."
    ]
];

const poem_map = [
    ["1.1", "1.2", "2.3", "2.2", "2.4", "1.3", "2.5", "2.1"],
    ["1.4", "1.1", "1.2", "2.1", "1.3", "2.2"],
    ["2.1", "2.2", "1.1", "1.2", "1.3", "1.4", "1.6", "2.3", "1.5"],
    ["2.1", "2.2", "1.1", "1.2", "2.3"],
    ["2.1", "2.4", "2.5", "2.3", "2.2", "1.1", "1.2"],
    ["1.4", "1.1", "2.1", "1.2", "1.5", "2.3", "2.2", "1.3"],
    ["2.1", "2.2", "2.3", "1.2", "1.1"],
    ["2.1", "1.1", "2.3", "2.2", "1.2"],
    ["1.1", "1.2", "2.2", "2.3", "2.4", "2.1"],
    ["1.1", "1.2", "1.3", "2.1", "2.2", "2.3", "2.4", "2.5", "2.6"],
    ["1.1", "2.1", "2.2", "1.2", "2.3", "1.3", "1.4"],
    ["1.2", "2.1", "1.1"],
    ["1.2", "1.1", "2.2", "2.1"],
    ["2.1", "2.2", "2.3", "1.3", "1.4", "1.1"],
    ["1.2", "2.2", "1.6", "1.8", "1.7", "1.9", "2.1", "1.1", "2.3", "1.3", "1.4"],
    ["1.8", "1.3", "1.2", "2.4", "2.5", "2.6", "1.1", "1.5", "1.6", "2.3", "1.4", "2.2", "2.1", "1.9"]
];

let STATE = true;

jQuery(document).ready(function ($) {
    let side = $("#left-side");
    poems.forEach(function (poem, poem_i) {
        poem.forEach(function (line, line_i) {
            if (poem_map[line_i]) {
                side.append(`<div class="line"></div>`);
                line.split(" ").forEach(function (word, word_i) {
                    let order = poem_map[line_i].indexOf(`${poem_i + 1}.${word_i + 1}`);
                    side.find(".line:last-child").append(`<div class="word" data-order="${order}">${word}</div>`)
                })
            }
        });
        side = $("#right-side")
    });

});

function magic() {
    if (STATE) {
        changeOrder();
        $('.play').css('opacity', 0);
        STATE = false
    } else {
        changeOrderBack();
        $('.play').css('opacity', 0);
        STATE = true
    }
}

const slow = 250;

function changeOrder() {
    $('.word').addClass('word_shadow');
    let side = $('#left-side');

    let baseX = 50;

    for (let side_i = 0; side_i < 2; side_i++) {
        let line_i = 0;
        side.find('.line').each(function () {
                let timeline = anime.timeline({
                    targets: this.children,
                    loop: false,
                    autoplay: true,
                    easing: 'easeInOutQuad'
                });

                timeline.add({
                    scale: 1.2,
                    duration: 6 * slow,
                }).add({
                    translateY: 1.1 * line_i + side_i * 1.75 + 'em',
                    scale: 1.2,
                    duration: 6 * slow,
                    offset: 7 * slow
                }).add({
                    translateY: 1.1 * line_i + side_i * 1.75 + 'em',
                    translateX: function (word, word_i) {
                        return transX(word, word_i, line_i, side_i, baseX)
                    },
                    scale: 1.2,
                    opacity: function (word, word_i) {
                        let new_order = poem_map[line_i].indexOf(`${side_i + 1}.${word_i + 1}`);
                        if (new_order < 0) {
                            return 0
                        } else {
                            return 1
                        }
                    },
                    duration: 6 * slow,
                    offset: 14 * slow
                }).add({
                    translateY: 0,
                    translateX: function (word, word_i) {
                        return transX(word, word_i, line_i, side_i, baseX)
                    },
                    scale: 1.2,
                    duration: 6 * slow,
                    offset: 21 * slow,
                    complete: function (anime) {
                        $('.word').removeClass('word_shadow');
                        $('.play').css('opacity', 1);
                    }
                }).add({
                    translateY: 0,
                    translateX: function (word, word_i) {
                        return transX(word, word_i, line_i, side_i, baseX)
                    },
                    scale: 1,
                    duration: 6 * slow,
                    offset: 28 * slow,
                });
                line_i++
            }
        );
        side = $('#right-side');
        baseX = -64
    }
}

function changeOrderBack() {
    $('.word').addClass('word_shadow');

    let side = $('#left-side');
    let baseX = 50;

    for (let side_i = 0; side_i < 2; side_i++) {
        let line_i = 0;
        side.find('.line').each(function () {
                let timeline = anime.timeline({
                    targets: this.children,
                    loop: false,
                    autoplay: true,
                    easing: 'easeInOutQuad'
                });

                timeline.add({
                    translateX: function (word, word_i) {
                        return transX(word, word_i, line_i, side_i, baseX)
                    },
                    scale: 1.2,
                    duration: 6 * slow
                }).add({
                    translateY: 1.1 * line_i + side_i * 1.75 + 'em',
                    translateX: function (word, word_i) {
                        return transX(word, word_i, line_i, side_i, baseX)
                    },
                    scale: 1.2,
                    duration: 6 * slow,
                    offset: 7 * slow
                }).add({
                    translateY: 1.1 * line_i + side_i * 1.75 + 'em',
                    translateX: 0,
                    scale: 1.2,
                    opacity: 1,
                    duration: 6 * slow,
                    offset: 14 * slow
                }).add({
                    translateY: 0,
                    translateX: 0,
                    scale: 1.2,
                    duration: 6 * slow,
                    offset: 21 * slow,
                    complete: function (anime) {
                        $('.word').removeClass('word_shadow');
                        $('.play').css('opacity', 1);
                    }
                }).add({
                    translateY: 0,
                    translateX: 0,
                    scale: 1,
                    duration: 6 * slow,
                    offset: 28 * slow,
                });
                line_i++
            }
        );
        side = $('#right-side');
        baseX = -64
    }
}

function transX(word, word_i, line_i, side_i, baseX) {
    console.log(`side: ${side_i + 1}, line: ${line_i + 1}, word: ${word_i + 1}, "${$(word).html()}"`);
    const wordGap = 1;

    if (poem_map[line_i]) {
        let sum = 0;
        let new_order = poem_map[line_i].indexOf(`${side_i + 1}.${word_i + 1}`);
        for (let prev_i = 0; prev_i < new_order; prev_i++) {
            let prev_word = poem_map[line_i][prev_i].split(".");
            let line_words = poems[Number(prev_word[0]) - 1][line_i].split(" ");
            sum += line_words[prev_word[1] - 1].length + wordGap
        }
        let line_words = poems[side_i][line_i].split(" ");
        let prev_chars = 0;
        for (let prev_i = 0; prev_i < word_i; prev_i++) {
            prev_chars += line_words[prev_i].length;
            prev_chars += wordGap
        }
        console.log(prev_chars);

        return baseX + sum - prev_chars + 'ch'
    } else {
        return 0
    }
}
