async function upgradeToMajorThird() {
  const localStyles = await figma.getLocalTextStylesAsync();
  const docStyles = localStyles.filter(s => !s.name.startsWith("UI /"));
  const newSizes = {
    "Headings/H1": 61, "Headings/H2": 49, "Headings/H3": 39,
    "Headings/H4": 31, "Headings/H5": 25, "Headings/H6": 20,
    "Body/Base": 16, "Body/Large": 20, "Body/Small (Label)": 13, "Caption": 10
  };
  for (const style of docStyles) {
    if (newSizes[style.name]) style.fontSize = newSizes[style.name];
  }
}
upgradeToMajorThird();
