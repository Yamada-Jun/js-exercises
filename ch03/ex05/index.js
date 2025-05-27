//文字列中の改行コードをLF→CR+LFに変換する
export function exchangeLFtoCRLF(str)
{
    return (str.replace("\n","\r\n"));
}

//文字列中の改行コードをCR+LF→LFに変換する
export function exchangeCRLFtoLF(str) {
    return (str.replace("\r\n", "\n"));
}