// 骰子函数&吉祥物
/**
 * 函数 D(n, x, k, p, c) = (nDx + p) * k + c
 * @param n 骰子个数
 * @param x 骰子面数
 * @param k 加权 ，默认1
 * @param p 第一修正，默认0
 * @param c 第二修正，默认0
 * @returns 
 */
function D(n: number, x: number, k = 1, p = 0, c = 0) {
    let sum = 0;
    for (let i = 0; i < n; i++) {
        let randomNumber = Math.floor(Math.random() * x) + 1;
        sum += randomNumber;
    }
    sum += p;
    let sumPlus = sum * k + c;
    return sumPlus;
}

// 检定函数
const successDiscription = ["大失败", "失败", "成功", "困难成功", "极难成功", "大成功"];

/**
 * 计算在不同规则下的临界成功值和大失败值
 * @param ruleCOC 规则编号
 * @param checkValue 检定值
 * @returns 包含临界成功值和大失败值的对象
 */
function calculateCriticalSuccessAndFumbleValues(ruleCOC: number, checkValue: number) {
    let criticalSuccessValue: number, fumbleValue: number;
    if (ruleCOC === 0) {
        criticalSuccessValue = 1;
        fumbleValue = checkValue >= 50 ? 100 : 96;
    } else if (ruleCOC === 1) {
        criticalSuccessValue = checkValue >= 50 ? 5 : 1;
        fumbleValue = checkValue >= 50 ? 100 : 96;
    } else if (ruleCOC === 2) {
        criticalSuccessValue = checkValue >= 5 ? 5 : checkValue;
        fumbleValue = checkValue >= 96 ? Math.min(checkValue + 1, 100) : 96;
    } else if (ruleCOC === 3) {
        criticalSuccessValue = 5;
        fumbleValue = 96;
    } else if (ruleCOC === 4) {
        const oneOfTen = Math.floor(checkValue / 10);
        criticalSuccessValue = oneOfTen >= 5 ? 5 : oneOfTen;
        fumbleValue = checkValue >= 50 ? 100 : 96 + oneOfTen;
    } else if (ruleCOC === 5) {
        const oneOfFive = Math.floor(checkValue / 5);
        criticalSuccessValue = oneOfFive >= 2 ? 2 : oneOfFive;
        fumbleValue = checkValue >= 50 ? 100 : 96;
    }
    return [criticalSuccessValue, fumbleValue];
}

/**
 * 执行一次骰子检定
 * @param ruleCOC 规则编号
 * @param checkValue 检定值
 * @param bonusOrPunishDice 奖励或惩罚骰子数
 * @param difficulty 难度
 * @returns 包含检定结果的[]string:[掷骰出目，目标检定值，检定结果(成功等级)，是否成功，描述语句]
 */
function Roll(ruleCOC: number, checkValue: number, bonusOrPunishDice = 0, difficulty = 1) {
    let tens = D(1, 10, 1, -1);
    let ones = D(1, 10, 10, -1);
    let NumberOfBonusOrPunishDice = Math.abs(bonusOrPunishDice);
    let result: number;
    let successRank: number;
    const Dice = [];
    if (tens + ones !== 0) {
        Dice[0] = Number(tens + ones);
    } else {
        Dice[0] = 100;
    }
    let minDice = Dice[0];
    let maxDice = Dice[0];
    for (let i = 0; i < NumberOfBonusOrPunishDice; i++) {
        result = D(1, 10, 10, -1) + tens;
        if (result === 0) {
            result = 100;
        }
        minDice = Math.min(minDice, result);
        maxDice = Math.max(maxDice, result);
    }
    if (bonusOrPunishDice >= 0) {
        result = minDice;
    } else {
        result = maxDice;
    }
    const [criticalSuccessValue, fumbleValue] = calculateCriticalSuccessAndFumbleValues(ruleCOC, checkValue);
    if (result <= checkValue) {
        successRank = 2;
    } else {
        successRank = 1;
    }
    if (successRank == 2) {
        if (result <= checkValue / 2) {
            successRank = 3;
        }
        if (result <= checkValue / 5) {
            successRank = 4;
        }
        if (result <= criticalSuccessValue) {
            successRank = 5;
        }
    }
    if (result >= fumbleValue) {
        successRank = 0;
    }
    const rollResult = [String(result), String(checkValue), String(successRank)];
    if (successRank > difficulty) {
        rollResult.push('1');
    } else {
        rollResult.push('0');
    }
    rollResult.push(`检定结果为: D100=${result}/${checkValue},${successDiscription[successRank]}`);
    return rollResult;
}

/**
 * 将骰子字符串分割成数字
 * @param dicestring 骰子字符串，格式为 "nDm"
 * @returns 分割后的数字数组,[n,m]
 */
function divideDice(dicestring: string) {
    let divideDiceNum = Number(dicestring.split("d"))
    return D(divideDiceNum[0], divideDiceNum[1])
}

/**
 * 计算骰子字符串的乘积
 * @param dicestring 骰子字符串，格式为 "nDm"
 * @returns 乘积结果,n*m
 */
function divideMut(dicestring: string) {
    let divideDiceNum = Number(dicestring.split("d"))
    return divideDiceNum[0] * divideDiceNum[1]
}
