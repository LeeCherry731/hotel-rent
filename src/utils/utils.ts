export default class Utils {
    static bath(price: any): string {
        if (typeof price === "undefined" || typeof price === null) {
            return "0.00"
        }
        let bathThai = new Intl.NumberFormat('th-TH', {
            style: 'currency',
            currency: 'THB',
        });
        if (typeof price === "string") {
            return bathThai.format(parseInt(price))
        }
        if (typeof price === "number") {
            return bathThai.format(price)
        }

        return "0.00"
    }
}