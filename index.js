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
        const html = generatingHTML.generateHTML(answer);
        // console.log(html)
        writeToFile(`${username}Profile.html`,html)
        .then(function(data){
            console.log("Successfully saved profile.")
        }).catch(function(err){
            console.log(er)
        });

    
        const queryUrl = `https://api.github.com/users/${username}`

        axios.get(queryUrl).then(res =>{
            
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

   

// async function getTotalStars(username){
//     try{
//     const starUrl = `https://api.github.com/users/${username}/starred?per_page=100`
//     await axios.get(starUrl).then(function(res){
//         return(res.data.length);
//     })
//     } catch (err) {
//         console.log(err);
//     }  
// }


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
