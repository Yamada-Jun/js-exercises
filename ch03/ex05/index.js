//�����񒆂̉��s�R�[�h��LF��CR+LF�ɕϊ�����
export function exchangeLFtoCRLF(str)
{
    return (str.replace("\n","\r\n"));
}

//�����񒆂̉��s�R�[�h��CR+LF��LF�ɕϊ�����
export function exchangeCRLFtoLF(str) {
    return (str.replace("\r\n", "\n"));
}