// all the npm packages
const fs = require("fs");
const axios = require("axios");
const util = require("util");
const inquirer = require("inquirer");
const generatingHTML = require("./generatingHtml.js");

const questions = [
    {
        type: "input",
        message: "What is your github username?",
        name: "username"
    },
    {
        type: "input",
        message:"What is your favorite color?",
        name:"color"
    }
];


inquirer
    .prompt(questions)
    .then(answer=>{
        const username =answer.username
        const color = answer.color;
        let html = generatingHTML.generateHTML(answer);
        // console.log(html)
        
       
    
        const queryUrl = `https://api.github.com/users/${username}`

        axios.get(queryUrl).then(res =>{
            let photoHead = photoHeaderContainer(res);
            html = html + photoHead;
            writeToFile(`${username}Profile.html`,html)
        .then(function(data){
            console.log("Successfully saved profile.")
        }).catch(function(err){
            console.log(er)
        });
            const picture = res.data.avatar_url;
           
            const gitHubProfile = res.data.html_url;
            const blog = res.data.blog;
            const location = res.data.location;
            const bio = res.data.bio;
            const numPublicRepo = res.data.public_repos;
            const followers = res.data.followers;
            const following = res.data.following;

        })

    })
    .catch(err=>console.log(err));

   
function photoHeaderContainer (res){
    return `
    <div class = "wrapper">
        <div class = row>
        <div class = photo-header col>
            <img src = ${res.data.avatar_url}, alt="self-photo">
            <h1> My name is ${res.data.name}. </h1>
            <h3> Currently ${res.data.company}.</h3>
            <div class = "links-nav">
                <div class = "nav-link"> <a href="https://www.google.com/maps/place/${res.data.location}">${res.data.location}</a></div>
                <div class = "nav-link"> <a href=${res.data.html_url}>GitHub</a></div>
                <div class = "nav-link"> <a href=${res.data.blog}>Blog</a></div>
            </div>
        </div>
        </div>
    </div>
    </body>`
}
async function getTotalStars(username){
    try{
    const starUrl = `https://api.github.com/users/${username}/starred?per_page=100`
    await axios.get(starUrl).then(function(res){
        return(res.data.length);
    })
    } catch (err) {
        console.log(err);
    }  
}


function writeToFile(fileName, data) {
    return new Promise(function(resolve,reject){
        fs.writeFile(fileName,data,function(err,data) {
        if(err){
            return reject(err);
        }
        resolve(data)
    });
    });
}


// function init() {

// init();
