document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('pre.bio-rel-block > code').forEach(function (el) {
    var lines = el.textContent.trim().split('\n');
    if (lines.length < 2) return;

    // Line 1: subject name | object name
    var nameParts = lines[0].split('|');
    var subject = nameParts[0].trim();
    var obj = nameParts.length > 1 ? nameParts[1].trim() : '';

    // Line 2 is a props row if it starts with '[' or '|'
    var subjectProps = '', objectProps = '', definition = '';
    var hasProps = lines.length >= 3 && /^\s*[\[|]/.test(lines[1]);

    if (hasProps) {
      var propsParts = lines[1].split('|');
      subjectProps = propsParts[0].trim();
      objectProps = propsParts.length > 1 ? propsParts[1].trim() : '';
      definition = lines.slice(2).join('\n').trim();
    } else {
      definition = lines.slice(1).join('\n').trim();
    }

    var propsRow = hasProps
      ? '<tr><td class="props">' + subjectProps + '</td><td class="props">' + objectProps + '</td></tr>'
      : '';

    var table = document.createElement('table');
    table.className = 'bio-rel';
    table.innerHTML =
      '<thead><tr>' +
        '<th class="subject">' + subject + '</th>' +
        '<th class="object">' + obj + '</th>' +
      '</tr></thead><tbody>' +
      propsRow +
      '<tr><td colspan="2">' + definition + '</td></tr>' +
      '</tbody>';

    el.closest('pre').replaceWith(table);
  });
});
