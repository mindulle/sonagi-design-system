async function createFormComposition() {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const colorsColl = collections.find(c => c.name === "Colors");
  const allVars = await figma.variables.getLocalVariablesAsync();
  const getVar = (name) => allVars.find(v => v.variableCollectionId === colorsColl?.id && (v.name === name || v.name === name.replace("bg/", "background/")));

  const tokens = {
    text: { primary: getVar("text/primary"), secondary: getVar("text/secondary"), brand: getVar("brand/primary") },
    bg: { surface: getVar("bg/surface") }, border: { default: getVar("border/default") }
  };
  const bindColor = (variable) => figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: {r:0, g:0, b:0} }, 'color', variable);

  await figma.loadFontAsync({ family: "Inter", style: "Bold" });
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Medium" });
  await figma.loadFontAsync({ family: "Pretendard", style: "Medium" }).catch(e=>{});
  await figma.loadFontAsync({ family: "Pretendard", style: "Regular" }).catch(e=>{});

  let page = figma.root.children.find(p => p.name === "Forms" || p.name === "Form Patterns");
  if (!page) { page = figma.createPage(); page.name = "Form Patterns"; }
  await figma.setCurrentPageAsync(page);

  const inputSet = figma.root.findOne(n => n.name === "Input" && n.type === "COMPONENT_SET");
  const checkboxSet = figma.root.findOne(n => n.name === "Checkbox" && n.type === "COMPONENT_SET");
  const buttonSet = figma.root.findOne(n => n.name === "Button" && n.type === "COMPONENT_SET");

  const masterInput = inputSet ? inputSet.children.find(c => c.name.includes("Size=Lg") && c.name.includes("State=Default")) || inputSet.children[0] : null;
  const masterCheckbox = checkboxSet ? checkboxSet.children.find(c => c.name.includes("Checked=False") && c.name.includes("State=Default")) || checkboxSet.children[0] : null;
  const masterButton = buttonSet ? buttonSet.children.find(c => c.name.includes("Type=Primary") && c.name.includes("Size=Lg")) || buttonSet.defaultVariant || buttonSet.children[0] : null;

  const formComp = figma.createComponent(); formComp.name = "Template = Login Form"; formComp.layoutMode = "VERTICAL";
  formComp.primaryAxisSizingMode = "AUTO"; formComp.counterAxisSizingMode = "FIXED"; formComp.resize(400, formComp.height);
  formComp.paddingTop = 32; formComp.paddingRight = 32; formComp.paddingBottom = 32; formComp.paddingLeft = 32;
  formComp.itemSpacing = 24; formComp.cornerRadius = 16;
  if (tokens.bg.surface) formComp.fills = [bindColor(tokens.bg.surface)];
  if (tokens.border.default) { formComp.strokes = [bindColor(tokens.border.default)]; formComp.strokeWeight = 1; }

  const header = figma.createFrame(); header.name = "Header"; header.layoutMode = "VERTICAL"; header.layoutAlign = "STRETCH"; header.fills = []; header.itemSpacing = 8;
  const title = figma.createText(); title.characters = "Welcome back"; title.fontName = { family: "Inter", style: "Bold" }; title.fontSize = 24; if (tokens.text.primary) title.fills = [bindColor(tokens.text.primary)];
  const sub = figma.createText(); sub.characters = "Please enter your details to sign in."; sub.fontName = { family: "Inter", style: "Regular" }; sub.fontSize = 14; if (tokens.text.secondary) sub.fills = [bindColor(tokens.text.secondary)];
  header.appendChild(title); header.appendChild(sub); formComp.appendChild(header);

  const inputGroup = figma.createFrame(); inputGroup.name = "Input Group"; inputGroup.layoutMode = "VERTICAL"; inputGroup.layoutAlign = "STRETCH"; inputGroup.fills = []; inputGroup.itemSpacing = 16;
  if (masterInput) {
    const emailInput = masterInput.createInstance(); emailInput.layoutAlign = "STRETCH";
    try { const emailLabel = emailInput.findOne(n => n.type === "TEXT" && n.name === "Label"); if (emailLabel) { await figma.loadFontAsync(emailLabel.fontName); emailLabel.characters = "Email Address"; } } catch(e){}
    try { const emailValue = emailInput.findOne(n => n.type === "TEXT" && n.name === "Value"); if (emailValue) { await figma.loadFontAsync(emailValue.fontName); emailValue.characters = "Enter your email"; } } catch(e){}
    inputGroup.appendChild(emailInput);
    const pwInput = masterInput.createInstance(); pwInput.layoutAlign = "STRETCH";
    try { const pwLabel = pwInput.findOne(n => n.type === "TEXT" && n.name === "Label"); if (pwLabel) { await figma.loadFontAsync(pwLabel.fontName); pwLabel.characters = "Password"; } } catch(e){}
    try { const pwValue = pwInput.findOne(n => n.type === "TEXT" && n.name === "Value"); if (pwValue) { await figma.loadFontAsync(pwValue.fontName); pwValue.characters = "••••••••"; } } catch(e){}
    inputGroup.appendChild(pwInput);
  }
  formComp.appendChild(inputGroup);

  const optionsRow = figma.createFrame(); optionsRow.name = "Options"; optionsRow.layoutMode = "HORIZONTAL"; optionsRow.layoutAlign = "STRETCH"; optionsRow.primaryAxisAlignItems = "SPACE_BETWEEN"; optionsRow.fills = [];
  if (masterCheckbox) {
    const checkbox = masterCheckbox.createInstance();
    try { const cbLabel = checkbox.findOne(n => n.type === "TEXT" && n.name === "Label"); if (cbLabel) { await figma.loadFontAsync(cbLabel.fontName); cbLabel.characters = "Remember me"; } } catch(e){}
    optionsRow.appendChild(checkbox);
  }
  const forgotPw = figma.createText(); forgotPw.characters = "Forgot password?"; forgotPw.fontName = { family: "Inter", style: "Medium" }; forgotPw.fontSize = 14; if (tokens.text.brand) forgotPw.fills = [bindColor(tokens.text.brand)]; optionsRow.appendChild(forgotPw); formComp.appendChild(optionsRow);

  if (masterButton) {
    const submitBtn = masterButton.createInstance(); submitBtn.layoutAlign = "STRETCH";
    try { const btnText = submitBtn.findOne(n => n.type === "TEXT"); if (btnText) { await figma.loadFontAsync(btnText.fontName); btnText.characters = "Sign In"; } } catch(e){}
    formComp.appendChild(submitBtn);
  }
  formComp.x = 100; formComp.y = 100; figma.viewport.scrollAndZoomIntoView([formComp]);
}
createFormComposition();
