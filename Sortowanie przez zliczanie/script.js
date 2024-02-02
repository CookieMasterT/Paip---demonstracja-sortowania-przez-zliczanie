const max_var = document.getElementById("max_var");
const num_var = document.getElementById("num_var");
const show_key = document.getElementById("show_key");
const regen = document.getElementById("regen");
const random_var = document.getElementById("random_var");
const sort_keys = document.getElementById("sort_key");

const shuffle_button = document.getElementById("shuffle");
let start_sort = document.getElementById("start_sort");

const var_store = document.getElementById("var_store");
const options_store = document.getElementById("options_store");

max_var.addEventListener("change",regen_table)
num_var.addEventListener("change",regen_table)
random_var.addEventListener("change",regen_table)
sort_keys.addEventListener("click",sort_key)
shuffle_button.addEventListener("click",shuffle)
regen.addEventListener("click",regen_table)
start_sort.addEventListener("click",count_sort)

show_key.addEventListener("change",reshow_table)
show_key.addEventListener("change",reshow_temp_table)

let table = [];
let keys = [];

regen_table(true);
function regen_table()
{
    table = [];
    keys = [];
    if (!random_var.checked)
    {
        let number = 1;
        let counter = 1;
        for (let i = 0; i < num_var.value; i++) {
            table.push(number - 1);
            if(counter > 26)
            {
                keys.push(counter)
            }
            else
            {
                keys.push((counter + 9).toString(36));
            }
            let temp = num_var.value - (number - 1);
            let temp2 = 0;
            while(temp > (parseInt(max_var.value) + 1))
            {
                temp -= parseInt(max_var.value) + 1;
                temp2++;
            }
            if (temp2 >= counter)
            {
                counter++;
            }
            else
            {
                counter = 1;
                number++;
            }
        }
    }
    else
    {
        temp_counters = []
        for (let i = 0; i < num_var.value; i++) {
            temp_counters.push(0);
        }
        for (let i = 0; i < num_var.value; i++) {
            let temp = Math.floor(Math.random() * (parseInt(max_var.value) + 1));
            table.push(temp);
            temp_counters[temp]++;
            if(temp_counters[temp] > 26)
            {
                keys.push(temp_counters[temp])
            }
            else
            {
                keys.push((temp_counters[temp] + 9).toString(36));
            }
        }
        count_sort_nil()
    }
    reshow_table()
}
function reshow_table()
{
    let temp = "";
    if (show_key.checked)
    {
        temp += "<tr>";
        keys.forEach(element => {
            temp += `<th>${element}</th>`;
        });
        temp += "</tr>"; 
    }
    temp += "<tr>";
    table.forEach(element => {
        temp += `<td>${element}</td>`;
    });
    temp += "</tr>";
    var_store.innerHTML = temp;
}
function sort_key()
{
    for (let i = 0; i <= parseInt(max_var.value); i++) {
        let temp_index = []
        let keys_via = []
        for (let l = 0; l < table.length; l++) {
            const element = table[l];
            if (element == i)
            {
                temp_index.push(l)
                keys_via.push(keys[l])
            }
        }
        for (let k = 0; k < keys_via.length; k++) {
            keys_via[k] = keys_via[k].charCodeAt(0) - 96
        }
        
        if(keys_via.length != undefined && keys_via.length > 1)
        {
            let swaps = 0
            let pointer = -1
            do {
                pointer = -1;
                swaps = 0;
                while (pointer + 2 < keys_via.length)
                {
                    pointer++;
                    if (keys_via[pointer] > keys_via[pointer + 1])
                    {
                        swaps++;
                        [keys_via[pointer], keys_via[pointer + 1]] = [keys_via[pointer + 1], keys_via[pointer]];//swapping is 2x easy with this method
                        [keys[temp_index[pointer]],keys[temp_index[pointer + 1]]] = [keys[temp_index[pointer + 1]], keys[temp_index[pointer]]];
                        //[temp_index[pointer], temp_index[pointer + 1]] = [temp_index[pointer + 1], temp_index[pointer]];
                    }
                }
            } while (!(swaps == 0 && pointer <= (keys_via.length - 1)));
        }
    }
    reshow_table();
}
function shuffle() 
{
    let currentIndex = table.length,  randomIndex;
    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [table[currentIndex], table[randomIndex]] = [
        table[randomIndex], table[currentIndex]];
        [keys[currentIndex], keys[randomIndex]] = [
        keys[randomIndex], keys[currentIndex]];
    }
    reshow_table();
}
let counter_store = document.getElementById("counter_store");
let temp_var_store = document.getElementById("temp_var_store");
counter_store.innerHTML = "";
temp_var_store.innerHTML = "";
function reshow_counters()
{
    if (counters.length > 0)
    {
        let temp = "";
        temp += "<tr>";
        for (let i = 0; i < parseInt(max_var.value) + 1; i++) {
            temp += `<th>${i}</th>`;
        }
        temp += "</tr>"; 
        temp += "<tr>";
        counters.forEach(element => {
            temp += `<td>${element}</td>`;
        });
        temp += "</tr>";
        counter_store.innerHTML = temp;
    }
}
function reshow_temp_table()
{
    if (temp_table.length > 0)
    {
        let temp = "";
        if (show_key.checked)
        {
            temp += "<tr>";
            temp_keys.forEach(element => {
                temp += `<th>${element}</th>`;
            });
            temp += "</tr>"; 
        }
        temp += "<tr>";
        temp_table.forEach(element => {
            temp += `<td>${element}</td>`;
        });
        temp += "</tr>";
        temp_var_store.innerHTML = temp;
    }
}
let step_b = document.getElementById("step");
let leap_b = document.getElementById("leap");
let run_b = document.getElementById("run");
let counters = [];
let temp_table = [];
let temp_keys = [];

const red_arrow = "Obrazy/red arrow.png";
const green_arrow = "Obrazy/green arrow.png";
const blue_arrow = "Obrazy/blue arrow.png";
const add = "Obrazy/add.png";

const pointer_1 = document.getElementById("pointer_1");
const pointer_2 = document.getElementById("pointer_2");
const pointer_3 = document.getElementById("pointer_3");
const long_arrow = document.getElementById("long_arrow");
const demonstration = document.getElementById("demonstration");
async function count_sort()
{
    max_var.removeEventListener("change",regen_table)
    num_var.removeEventListener("change",regen_table)
    random_var.removeEventListener("change",regen_table)
    sort_keys.removeEventListener("click",sort_key)
    shuffle_button.removeEventListener("click",shuffle)
    regen.removeEventListener("click",regen_table)
    start_sort.removeEventListener("click",count_sort)

    options_store.innerHTML = '<button class="option" id="step">></button><button class="option" id="leap">-></button><button class="option" id="run">>></button>';
    step_b = document.getElementById("step");
    leap_b = document.getElementById("leap");
    run_b = document.getElementById("run");
    
    step = false;
    leap = false;
    run = false;
    await step_break();
    counters = [];
    for (let i = 0; i <= max_var.value; i++) {//create counter table
        counters.push(0);
    }
    reshow_counters();
    await leap_break_b();
    pointer_1.src = green_arrow;
    pointer_1.style = "width: 50px;";
    pointer_2.src = red_arrow;
    pointer_2.style = "width: 50px;";
    for (let i = 0; i < table.length; i++) {//count all values in table
        const element = table[i];
        pointer_1.style = `width: 50px; margin-left:${i * 53}px; margin-right:${(table.length - (i+1)) * 53}px;`;
        counters[element]++;
        pointer_2.style = `width: 50px; margin-left:${element * 53}px; margin-right:${(counters.length - (element+1)) * 53}px;`;
        reshow_counters();
        await step_break();
    }
    pointer_1.style = "";
    pointer_2.style = "";
    pointer_2.src = add;
    await leap_break();
    pointer_2.style = "width: 50px;";
    for (let i = 1; i < counters.length; i++) {//add previous values in counter
        counters[i] += counters[i-1];
        pointer_2.style = `width: 50px; margin-left:${(i-0.5) * 53}px; margin-right:${(counters.length - (i+0.5)) * 53}px;`;
        reshow_counters();
        await step_break();
    }
    pointer_2.style = "";
    await leap_break();
    for (let i = 0; i < counters.length; i++) {//-1 to all values in counter
        counters[i]--;
    }
    document.getElementById("deduction").innerText = "-1";
    reshow_counters();
    await leap_break_b();
    document.getElementById("deduction").innerText = "";
    temp_table = [];
    temp_keys = [];
    for (let i = 0; i < num_var.value; i++) {//create the secondary table
        temp_table.push(" ");
        temp_keys.push(" ");
    }
    pointer_1.src = green_arrow;
    pointer_2.src = blue_arrow;
    pointer_3.src = red_arrow;
    reshow_temp_table();
    await leap_break_b();
    pointer_1.style = "width: 50px;";
    pointer_2.style = "width: 50px;";
    pointer_3.style = "width: 50px;";
    for (let i = table.length - 1; i >= 0; i--) {//insert values into secondary table with help from counter
        const element = table[i];
        pointer_1.style = `width: 50px; margin-left:${i * 53}px; margin-right:${(table.length - (i+1)) * 53}px;`;
        pointer_2.style = `width: 50px; margin-left:${element * 53}px; margin-right:${(counters.length - (element+1)) * 53}px;`;
        pointer_3.style = `width: 50px; margin-left:${counters[element] * 53}px; margin-right:${(temp_table.length - (counters[element]+1)) * 53}px;`;
        temp_table[counters[element]] = element;
        temp_keys[counters[element]] = keys[i];
        reshow_temp_table();
        counters[element]--;
        reshow_counters();
        await step_break();
    }
    pointer_1.style = "";
    pointer_2.style = "";
    pointer_3.style = "";
    await leap_break()//replace original table with secondary table
    table = temp_table;
    keys = temp_keys;
    reshow_table();
    long_arrow.style = "width: 50px";
    demonstration.style = "margin-left: 50px;";
    await leap_break_b()
    long_arrow.style = "";
    demonstration.style = "";

    counters = [];
    temp_table = [];
    temp_keys = [];
    counter_store.innerHTML = "";
    temp_var_store.innerHTML = "";
    options_store.innerHTML = '<button id="start_sort">START</button>';
    start_sort = document.getElementById("start_sort");

    max_var.addEventListener("change",regen_table)
    num_var.addEventListener("change",regen_table)
    random_var.addEventListener("change",regen_table)
    sort_keys.addEventListener("click",sort_key)
    shuffle_button.addEventListener("click",shuffle)
    regen.addEventListener("click",regen_table)
    start_sort.addEventListener("click",count_sort)
}
function count_sort_nil()
{
    max_var.removeEventListener("change",regen_table)
    num_var.removeEventListener("change",regen_table)
    random_var.removeEventListener("change",regen_table)
    shuffle_button.removeEventListener("click",shuffle)
    regen.removeEventListener("click",regen_table)
    start_sort.removeEventListener("click",count_sort)
    counters = [];
    for (let i = 0; i <= max_var.value; i++) {//create counter table
        counters.push(0);
    }
    for (let i = 0; i < table.length; i++) {//count all values in table
        const element = table[i];
        counters[element]++;
    }
    for (let i = 1; i < counters.length; i++) {//add previous values in counter
        counters[i] += counters[i-1];
    }
    for (let i = 0; i < counters.length; i++) {//-1 to all values in counter
        counters[i]--;
    }
    temp_table = [];
    temp_keys = [];
    for (let i = 0; i < num_var.value; i++) {//create the secondary table
        temp_table.push(" ");
        temp_keys.push(" ");
    }
    for (let i = table.length - 1; i >= 0; i--) {//insert values into secondary table with help from counter
        const element = table[i];
        temp_table[counters[element]] = element;
        temp_keys[counters[element]] = keys[i];
        counters[element]--;
    }
    table = temp_table;//replace original table with secondary table
    keys = temp_keys;
    counters = [];
    temp_table = [];
    temp_keys = [];

    max_var.addEventListener("change",regen_table)
    num_var.addEventListener("change",regen_table)
    random_var.addEventListener("change",regen_table)
    shuffle_button.addEventListener("click",shuffle)
    regen.addEventListener("click",regen_table)
    start_sort.addEventListener("click",count_sort)
}
let step = false;
let leap = false;
let run = false;
function step_break() {
    if (leap || run)
    {
        return Promise.resolve()
    }
    else
    {
        return new Promise((resolve) => {
            const step_r = () => {
                step = true;
                step_b.removeEventListener("click", step_r);
                leap_b.removeEventListener("click", leap_r);
                run_b.removeEventListener("click", run_r);
                resolve();
            }
            const leap_r = () => {
                leap = true;
                step_b.removeEventListener("click", step_r);
                leap_b.removeEventListener("click", leap_r);
                run_b.removeEventListener("click", run_r);
                resolve();
            }
            const run_r = () => {
                run = true;
                step_b.removeEventListener("click", step_r);
                leap_b.removeEventListener("click", leap_r);
                run_b.removeEventListener("click", run_r);
                resolve();
            }
            step = false;
            step_b.addEventListener("click", step_r);
            leap_b.addEventListener("click", leap_r);
            run_b.addEventListener("click", run_r);
        })
    }
}
function leap_break() {
    if (run || step)
    {
        return Promise.resolve()
    }
    else
    {
        return new Promise((resolve) => {
            const step_r = () => {
                step_b.removeEventListener("click", step_r);
                leap_b.removeEventListener("click", leap_r);
                run_b.removeEventListener("click", run_r);
                resolve();
            }
            const leap_r = () => {
                leap = true;
                step_b.removeEventListener("click", step_r);
                leap_b.removeEventListener("click", leap_r);
                run_b.removeEventListener("click", run_r);
                resolve();
            }
            const run_r = () => {
                run = true;
                step_b.removeEventListener("click", step_r);
                leap_b.removeEventListener("click", leap_r);
                run_b.removeEventListener("click", run_r);
                resolve();
            }
            leap = false;
            step_b.addEventListener("click", step_r);
            leap_b.addEventListener("click", leap_r);
            run_b.addEventListener("click", run_r);
        })
    }
}
function leap_break_b() {
    if (run)
    {
        return Promise.resolve()
    }
    else
    {
        return new Promise((resolve) => {
            const step_r = () => {
                step_b.removeEventListener("click", step_r);
                leap_b.removeEventListener("click", leap_r);
                run_b.removeEventListener("click", run_r);
                resolve();
            }
            const leap_r = () => {
                leap = true;
                step_b.removeEventListener("click", step_r);
                leap_b.removeEventListener("click", leap_r);
                run_b.removeEventListener("click", run_r);
                resolve();
            }
            const run_r = () => {
                run = true;
                step_b.removeEventListener("click", step_r);
                leap_b.removeEventListener("click", leap_r);
                run_b.removeEventListener("click", run_r);
                resolve();
            }
            leap = false;
            step_b.addEventListener("click", step_r);
            leap_b.addEventListener("click", leap_r);
            run_b.addEventListener("click", run_r);
        })
    }
}