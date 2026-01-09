import os
import json

def analyze_folder(folder_path):
    folder_structure = {}

    for root, dirs, files in os.walk(folder_path):
        # Relative path from root folder
        rel_path = os.path.relpath(root, folder_path)
        current_level = folder_structure

        if rel_path != ".":
            for part in rel_path.split(os.sep):
                current_level = current_level.setdefault(part, {})

        # Add files in current folder
        current_level["files"] = files

    return folder_structure

def print_structure(structure, indent=0):
    for key, value in structure.items():
        if key == "files":
            for f in value:
                print("    " * indent + f"- {f}")
        else:
            print("    " * indent + f"[Folder] {key}")
            print_structure(value, indent + 1)

# --- Usage ---
folder_path = r"C:\Users\nitin\OneDrive\Desktop\PORTFOLIO"  # change this
structure = analyze_folder(folder_path)

# Print folder structure
print_structure(structure)

# Optional: Save as JSON
with open("folder_structure.json", "w") as f:
    json.dump(structure, f, indent=4)
