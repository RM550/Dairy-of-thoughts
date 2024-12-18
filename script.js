// script.js

// Sign In Button Click Event
document.getElementById('signInButton').addEventListener('click', function() {
    let username = document.getElementById('username').value;
    if (username) {
        localStorage.setItem('username', username);
        showDiaryPage(username);
    } else {
        alert('Please enter your name');
    }
});

// Show Diary Page and Load User Entries
function showDiaryPage(username) {
    // Hide Sign In page
    document.getElementById('signInContainer').style.display = 'none';
    
    // Show Diary page
    document.getElementById('diaryContainer').style.display = 'block';
    document.getElementById('userNameDisplay').textContent = username;
    
    // Show Sign Out button
    document.querySelector('.signOutContainer').style.display = 'flex';
    
    loadEntries(username);
}

// Save Diary Entry
document.getElementById('saveButton').addEventListener('click', function() {
    let entry = document.getElementById('diaryEntry').value;
    let username = localStorage.getItem('username');
    
    if (entry && username) {
        let entries = JSON.parse(localStorage.getItem(username + '_entries')) || [];
        entries.push({ entry: entry, date: new Date().toLocaleString() });
        localStorage.setItem(username + '_entries', JSON.stringify(entries));
        
        document.getElementById('diaryEntry').value = ''; // Clear textarea
        loadEntries(username); // Reload entries after saving
    } else {
        alert('Please enter your thoughts.');
    }
});

// Sign Out Button Click Event
document.getElementById('signOutButton').addEventListener('click', function() {
    // Clear user data from localStorage
    localStorage.removeItem('username');
    
    // Show Sign In page and hide Diary page
    document.getElementById('signInContainer').style.display = 'block';
    document.getElementById('diaryContainer').style.display = 'none';
    
    // Hide the sign-out button
    document.querySelector('.signOutContainer').style.display = 'none';
});

// Load Entries for Logged-In User
function loadEntries(username) {
    let entries = JSON.parse(localStorage.getItem(username + '_entries')) || [];
    let entriesList = document.getElementById('entriesList');
    entriesList.innerHTML = ''; // Clear the list before reloading
    
    // Display each entry
    entries.forEach(function(entry) {
        let li = document.createElement('li');
        li.textContent = entry.date + " - " + entry.entry;
        entriesList.appendChild(li);
    });
}

// Check if user is already signed in when the page loads
window.onload = function() {
    let username = localStorage.getItem('username');
    if (username) {
        showDiaryPage(username);
    } else {
        document.getElementById('signInContainer').style.display = 'block';
    }
}
