import json

# Define the new primitive scales based on the hex values found in semantics.json
burgundy_scale = {
    "25": {"$value": "#fefaf9", "$type": "color"},
    "50": {"$value": "#fcf2f0", "$type": "color"},
    "100": {"$value": "#f5e5e2", "$type": "color"},
    "150": {"$value": "#ffc6bc", "$type": "color"},
    "200": {"$value": "#eeb4a9", "$type": "color"},
    "250": {"$value": "#f7a7a1", "$type": "color"},
    "300": {"$value": "#e5867f", "$type": "color"},
    "400": {"$value": "#d2645f", "$type": "color"},
    "500": {"$value": "#b44240", "$type": "color"},
    "800": {"$value": "#47211b", "$type": "color"},
    "900": {"$value": "#38130e", "$type": "color"}
}

brown_scale = {
    "50": {"$value": "#f7eeec", "$type": "color"},
    "200": {"$value": "#d7c5c2", "$type": "color"},
    "300": {"$value": "#c3b4b1", "$type": "color"},
    "400": {"$value": "#9d8986", "$type": "color"},
    "410": {"$value": "#988a88", "$type": "color"},
    "450": {"$value": "#95817f", "$type": "color"},
    "500": {"$value": "#756563", "$type": "color"},
    "550": {"$value": "#796966", "$type": "color"},
    "600": {"$value": "#614f4b", "$type": "color"},
    "650": {"$value": "#6c605e", "$type": "color"},
    "800": {"$value": "#392e2c", "$type": "color"},
    "820": {"$value": "#392d2b", "$type": "color"},
    "850": {"$value": "#2c201e", "$type": "color"},
    "900": {"$value": "#1e1311", "$type": "color"},
    "950": {"$value": "#1c1412", "$type": "color"}
}

# Reverse mapping: hex to token alias
hex_to_token = {}
for scale_name, scale in [("burgundy", burgundy_scale), ("brown", brown_scale)]:
    for level, obj in scale.items():
        hex_to_token[obj["$value"].lower()] = f"{{primitive.{scale_name}.{level}}}"

# Add state colors mapping
state_colors = {
    "#1275b5": "{primitive.blue.600}",
    "#e8f1f8": "{primitive.state.info-bg}",
    "#2ea043": "{primitive.state.success}",
    "#eaf4eb": "{primitive.state.success-bg}",
    "#d29922": "{primitive.state.warning}",
    "#fdf5e5": "{primitive.state.warning-bg}",
    "#c83e4d": "{primitive.state.danger}",
    "#fde8e8": "{primitive.state.danger-light}",
    "#79c0ff": "{primitive.state.info-light}",
    "#1c2d42": "{primitive.state.info-dark}",
    "#56d364": "{primitive.state.success-light}",
    "#132e19": "{primitive.state.success-dark}",
    "#e3b341": "{primitive.state.warning-light}",
    "#2e2305": "{primitive.state.warning-dark}",
    "#f85149": "{primitive.state.danger}",
    "#421818": "{primitive.state.danger-dark}",
    "#00ffcc": "{primitive.brand.cyan}"
}
for h, t in state_colors.items():
    hex_to_token[h.lower()] = t

prim_file = "/home/ubuntu/sonagi-design-system/packages/tokens/tokens/primitives.json"
sem_file = "/home/ubuntu/sonagi-design-system/packages/tokens/tokens/semantics.json"

with open(prim_file, "r") as f:
    primitives = json.load(f)

# Inject new scales
primitives["primitive"]["burgundy"] = burgundy_scale
primitives["primitive"]["brown"] = brown_scale

# Inject missing state colors if not exist
if "info-bg" not in primitives["primitive"]["state"]:
    primitives["primitive"]["state"].update({
        "info-bg": {"$value": "#e8f1f8", "$type": "color"},
        "info-light": {"$value": "#79c0ff", "$type": "color"},
        "info-dark": {"$value": "#1c2d42", "$type": "color"},
        "success-dark": {"$value": "#132e19", "$type": "color"},
        "warning-dark": {"$value": "#2e2305", "$type": "color"},
        "danger-dark": {"$value": "#421818", "$type": "color"}
    })
primitives["meta"]["version"] = "1.3.0"

with open(prim_file, "w") as f:
    json.dump(primitives, f, indent=2, ensure_ascii=False)

# Update semantics.json
with open(sem_file, "r") as f:
    semantics = json.load(f)

def replace_hex_with_alias(obj):
    if isinstance(obj, dict):
        # We process children first
        for k, v in obj.items():
            if k == "$value" and isinstance(v, str):
                val_lower = v.lower()
                if val_lower in hex_to_token:
                    obj[k] = hex_to_token[val_lower]
            else:
                replace_hex_with_alias(v)
    elif isinstance(obj, list):
        for item in obj:
            replace_hex_with_alias(item)

replace_hex_with_alias(semantics)

with open(sem_file, "w") as f:
    json.dump(semantics, f, indent=2, ensure_ascii=False)

print("Tokens successfully mapped and replaced!")
