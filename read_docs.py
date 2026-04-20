import docx
import os

def read_docx(file_path):
    if not os.path.exists(file_path):
        return f"File not found: {file_path}"
    doc = docx.Document(file_path)
    full_text = []
    for para in doc.paragraphs:
        full_text.append(para.text)
    return '\n'.join(full_text)

files = [
    r'd:\HelloPM_Internshala_Prototype\PRD_Internshala_Subhchandan_Das_C50.docx',
    r'd:\HelloPM_Internshala_Prototype\Prototype_Prompt_Internshala_Subhchandan_Das_C50.docx'
]

for file_path in files:
    print(f'--- START OF FILE: {file_path} ---')
    try:
        print(read_docx(file_path))
    except Exception as e:
        print(f'Error reading file {file_path}: {e}')
    print(f'--- END OF FILE: {file_path} ---\n')
