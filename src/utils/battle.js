import { diceRoll } from ".";

export const battleLogMessage = (type, name, damage = 0) => {
    const messageIndex = diceRoll(9);
    let messageArray = [];
    
    switch (type) {
        case "hit":
            messageArray = [
                `${name} landed a solid hit for ${damage} damage!`,
                `${name} struck effectively, dealing ${damage} damage!`,
                `It's a direct hit! ${name} dealt ${damage} damage!`,
                `${name} landed a powerful blow, causing ${damage} damage!`,
                `A clean strike! ${name} inflicted ${damage} damage!`,
                `The attack connected! ${name} dealt ${damage} damage!`,
                `${name} hit hard, causing ${damage} damage!`,
                `A well-placed attack from ${name} dealt ${damage} damage!`,
                `That must've hurt! ${name} inflicted ${damage} damage!`
            ];
            break;

        case "half":
            messageArray = [
                `${name} landed a weak hit, causing only ${damage} damage...`,
                `${name}'s attack barely connected, dealing ${damage} damage.`,
                `It's a glancing blow! ${name} inflicted ${damage} damage.`,
                `${name} hit, but it wasn't very effective... Only ${damage} damage.`,
                `The attack was weakened! ${name} dealt just ${damage} damage.`,
                `${name} managed to hit, but only for ${damage} damage.`,
                `A weak strike from ${name}, causing ${damage} damage.`,
                `${name} struggled to land a clean hit, dealing ${damage} damage.`,
                `${name} attacked, but the impact was minor... Just ${damage} damage.`
            ];
            break;

        case "miss":
            messageArray = [
                `${name} missed the attack!`,
                `${name} failed to connect... A complete miss!`,
                `A swing and a miss! ${name}'s attack didn't land.`,
                `${name} aimed carefully but missed the mark!`,
                `${name} attacked, but the move was dodged!`,
                `That was close, but ${name} didn't hit!`,
                `${name} struck, but the opponent effortlessly avoided it!`,
                `The attack went wide! ${name} couldn't land the hit.`,
                `An unfortunate miss! ${name} couldn't deal any damage.`
            ];
            break;

        case "crit":
            messageArray = [
                `It's a critical hit! ${name} dealt a crushing ${damage} damage!`,
                `An amazing strike! ${name} landed a critical blow for ${damage} damage!`,
                `A devastating hit! ${name} unleashed ${damage} damage!`,
                `Super effective! ${name} struck with incredible force, causing ${damage} damage!`,
                `A powerful attack! ${name} inflicted ${damage} critical damage!`,
                `An incredible hit! ${name} delivered ${damage} damage!`,
                `${name} performed a masterful attack, dealing ${damage} critical damage!`,
                `That was brutal! ${name} unleashed ${damage} damage!`,
                `A strike filled with power! ${name} crushed the opponent with ${damage} damage!`
            ];
            break;

        default:
            messageArray = [
                `${name} is waiting for the opponent...`,
                `${name} is preparing...`,
                `${name} is focused on the battle...`,
                `${name} watches carefully for an opening...`,
                `${name} steadies itself for the next action...`,
                `${name} stands ready for the next round...`,
                `${name} is analyzing the situation...`,
                `${name} is biding its time...`,
                `${name} is waiting for the perfect moment to strike...`
            ];
    }

    return messageArray[messageIndex];
};

export const colorByHitType = (hitType) => {
    switch (hitType) {
        case 'half':
            return 'yellow.500';
        case'miss':
            return'red.500';
        case 'crit':
            return 'green.500';
        case 'hit':
        default:
            return 'white';
    }
};