document.getElementById("delete").addEventListener("click", () => {
    // Display a confirmation dialog
    let result = confirm("Do you want to delete?");
    
    // Check the result of the confirmation
    if (result) {
        // If user confirms, proceed with the delete action
        fetch('/users/delete/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ confirm: true }) // You can send additional data if needed
        })
        .then(response => {
            // Handle the response
            console.log('Delete request sent');
            // You can handle success/failure cases here
        })
        .catch(error => {
            console.error('Error while deleting:', error);
        });
    } else {
        // If user cancels, do nothing or handle the cancel case as needed
        console.log('Delete canceled');
    }
});
