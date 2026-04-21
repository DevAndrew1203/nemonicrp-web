import json

with open('index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Remove the <ul> list (lines 101 to 108 according to 1-indexing)
del lines[100:108]

# Find the start of REGRAS (As Leis do Mundo)
regras_start = -1
for i, line in enumerate(lines):
    if '<!-- 4. REGRAS PRINCIPAIS -->' in line:
        regras_start = i
        break

# Find the start of HIERARQUIA 
hierarquia_start = -1
for i, line in enumerate(lines):
    if '<!-- 8. HIERARQUIA E STATUS -->' in line:
        hierarquia_start = i
        break

# Find the start of PROGRESSAO
progressao_start = -1
for i, line in enumerate(lines):
    if '<!-- 8.5 PROGRESSÃO SOCIAL -->' in line:
        progressao_start = i
        break

# Find the start of CLASSES
classes_start = -1
for i, line in enumerate(lines):
    if '<!-- 9. CLASSES / FUNÇÕES. -->' in line:
        classes_start = i
        break

# Extract the sections
# Note: indices change as we delete, so we extract by content first.
hierarquia_code = lines[hierarquia_start:progressao_start]
progressao_code = lines[progressao_start:classes_start]

# Delete them from the bottom up to preserve top-down index references
del lines[hierarquia_start:classes_start]

# We need to find regras_start AGAIN because we deleted lines above it?
# No, hierarquia and progressao are AFTER regras. So regras_start index is unchanged.
# Insert Progressao first, then Hierarquia
lines = lines[:regras_start] + progressao_code + hierarquia_code + lines[regras_start:]

with open('index.html', 'w', encoding='utf-8') as f:
    f.writelines(lines)

print('Success')
