function processText() {
    var text = document.getElementById("inputText").value;

    // Calculate general statistics
    var letters = text.match(/[a-zA-Z]/g);
    var countLetters = letters ? letters.length : 0;
    
    var words = text.trim().split(/\s+/);
    var countWords = text.trim() === "" ? 0 : words.length;
    
    var spaces = text.match(/ /g);
    var countSpaces = spaces ? spaces.length : 0;
    
    var newlines = text.match(/\n/g);
    var countNewlines = newlines ? newlines.length : 0;
    
    // Special symbols: characters that are not letters, digits or whitespace.
    var specials = text.match(/[^a-zA-Z0-9\s]/g);
    var countSpecials = specials ? specials.length : 0;
    
    var stats = "<h3>General Statistics</h3>" +
                "<p><strong>Letters:</strong> " + countLetters + "</p>" +
                "<p><strong>Words:</strong> " + countWords + "</p>" +
                "<p><strong>Spaces:</strong> " + countSpaces + "</p>" +
                "<p><strong>Newlines:</strong> " + countNewlines + "</p>" +
                "<p><strong>Special Symbols:</strong> " + countSpecials + "</p>";
    
    // Tokenize text into words, converting to lowercase for easier matching.
    var tokens = text.toLowerCase().match(/\b\w+\b/g);
    tokens = tokens || [];

    // Count pronouns grouped by pronoun.
    var pronounsList = ["i", "you", "he", "she", "it", "we", "they", "me", "him", "her", "us", "them"];
    var pronounCounts = {};
    pronounsList.forEach(function(pronoun) {
      pronounCounts[pronoun] = 0;
    });

    tokens.forEach(function(token) {
      if (pronounsList.indexOf(token) !== -1) {
        pronounCounts[token]++;
      }
    });

    var pronounOutput = "<h3>Pronoun Counts</h3><ul>";
    for (var pronoun in pronounCounts) {
      pronounOutput += "<li><strong>" + pronoun + ":</strong> " + pronounCounts[pronoun] + "</li>";
    }
    pronounOutput += "</ul>";
    
    // Count prepositions grouped by preposition.
    var prepositionsList = [
      "in", "on", "at", "by", "for", "with", "about", "against", "between", "into",
      "through", "during", "before", "after", "above", "below", "to", "from", "up", "down", "of"
    ];
    var prepositionCounts = {};
    prepositionsList.forEach(function(prep) {
      prepositionCounts[prep] = 0;
    });

    tokens.forEach(function(token) {
      if (prepositionsList.indexOf(token) !== -1) {
        prepositionCounts[token]++;
      }
    });

    var prepOutput = "<h3>Preposition Counts</h3><ul>";
    for (var prep in prepositionCounts) {
      prepOutput += "<li><strong>" + prep + ":</strong> " + prepositionCounts[prep] + "</li>";
    }
    prepOutput += "</ul>";
    
    // Count indefinite articles ("a" and "an")
    var articlesList = ["a", "an"];
    var articleCounts = {"a": 0, "an": 0};
    
    tokens.forEach(function(token) {
      if (articlesList.indexOf(token) !== -1) {
        articleCounts[token]++;
      }
    });

    var articleOutput = "<h3>Indefinite Article Counts</h3><ul>";
    for (var art in articleCounts) {
      articleOutput += "<li><strong>" + art + ":</strong> " + articleCounts[art] + "</li>";
    }
    articleOutput += "</ul>";
    
    // Print all outputs to the page.
    document.getElementById("results").innerHTML = stats + pronounOutput + prepOutput + articleOutput;
}