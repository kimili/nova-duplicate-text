exports.activate = () => {};
exports.deactivate = () => {};

nova.commands.register("duplicateText", (editor) => {
  const newSelectedRanges = [];

  editor.edit((textEdit) => {
    editor.selectedRanges.forEach((range) => {
      let currentRangeLength;
      if (range.empty) {
        const lineRange = editor.getLineRangeForRange(range);
        const text = editor.getTextInRange(lineRange);
        textEdit.replace(new Range(lineRange.start, lineRange.start), text);
        currentRangeLength = lineRange.length;
      } else {
        const text = editor.getTextInRange(range);
        textEdit.insert(range.start, text);
        currentRangeLength = range.length;
      }

      newSelectedRanges.push(
        new Range(
          range.start + currentRangeLength,
          range.end + currentRangeLength
        )
      );
    });
  });

  // Update the selected ranges
  editor.selectedRanges = newSelectedRanges;
});
