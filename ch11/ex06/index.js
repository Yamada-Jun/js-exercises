export function isEmailAddress(r) {
    // ここに実装する
    // local-partおよびdomainのdot-atomのみ考慮する
    if (typeof r !== "string") return false;
    // 
    const atIndex = r.indexOf("@");
    // @が1つだけ存在すること
    // @がない、または複数ある場合は不正
    if (atIndex === -1) return false;
    const localPart = r.slice(0, atIndex);
    const domain = r.slice(atIndex + 1);
    if (localPart.length === 0 || domain.length === 0) return false;
    if (localPart.length > 64 || domain.length > 255) return false;

    const atom = "[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+";
    const dotAtom = new RegExp(`^${atom}(\\.${atom})*$`);
    if (!dotAtom.test(localPart) || !dotAtom.test(domain)) return false;

    const consecutiveDots = /\.\./;
    if (consecutiveDots.test(localPart) || consecutiveDots.test(domain)) return false;
    if (localPart.startsWith(".") || localPart.endsWith(".")) return false;
    if (domain.startsWith(".") || domain.endsWith(".")) return false;

    return false;
}