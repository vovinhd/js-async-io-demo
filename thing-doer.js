#!/usr/bin/env node 
const assert = require('assert');
const { randomInt } = require('crypto');

const actions = [
    "combobulating",
    "discombobulating",
    "setting lp0 on fire",
    "reading the manual",
    "feeding the super cow",
    "reaping children",
    "causing blue screens",
    "meditating",
    "leaking memory",
    "injecting sql",
    "waiting for godot"
]

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

const doThings = async (time, tag, actions) => {
    for (let i = 0; i < time; i++) {
        console.log(`[${tag}] ${actions[randomInt(actions.length)]}...`);
        await sleep(1000);
    }
}

const main = async () => {
    
    const args = process.argv.slice(2);
    let iterations = +args[0] ?? 3;
    let tag = args[1] ?? "";

    assert(args.length > 0, "Usage: node thing-doer.js <iterations> [tag]")
    assert(Number.isSafeInteger(iterations), "Iterarions should be an int");
    const start = Date.now();

    console.log(`${tag === "" ? "Running annonymously" : `Running as ${tag}`} for ${iterations}s`);
    await doThings(iterations, tag, actions)

    const end = Date.now();
    const took = end - start
    console.log(`${tag === "" ? "Finished" : `${tag} finished`} after ${took/1000.0}s`);

}

main()