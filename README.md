# I designed a HW from scratch for a course for extra credit

# HW-#1: Gaming Dashboard: Linking Charts and Adding Interactivity

The goal of this extra credit assignment is to give you practice building linked visualizations using D3.js. By completing this assignment, you will learn how to:

-Visualize hierarchical data with a Treemap.
-Create a time-series visualization using a Line Chart.
-Dynamically link multiple visualizations for interactivity.
-Implement tooltips and animations to enhance usability.

Below is an example of what your finished dashboard will look like:

## Overview
The starter code for this assignment includes a basic HTML structure with two empty panels:

A left panel, where you will implement a Treemap visualization to show the hierarchical distribution of games by genre, platform, and title.
A right panel, where you will implement a Line Chart visualization to display the average playtime trend over time for the selected genre, platform, or title from the Treemap.
Your task is to preprocess the dataset, create these visualizations, and implement dynamic linking between the two panels. The starter code provides the framework, but you will need to build both visualizations and add the required interactivity.

## Data Description

We will use the Steam Store Games Dataset, which contains the following relevant columns:

-Genres: The genre(s) of each game (e.g., Action, RPG).
-Platforms: The platforms on which the game is available (e.g., Windows, Mac).
-Name: The title of the game.
-Owners: Estimated number of game owners, used for sizing Treemap rectangles.
-Average_Playtime: Average playtime in minutes, used for the Line Chart.
-Release_Date: The game's release date, used as the X-axis for the Line Chart.

You will preprocess the dataset to:

-Group games by genres, platforms, and titles for the Treemap.
-Extract time-series data for the Line Chart.

In the completed version of this assignment, the left panel will display a Treemap visualization showing the hierarchical distribution of games by genres, platforms, and titles, with rectangle sizes representing the number of owners. The right panel will feature a Line Chart that displays the average playtime trend over time for the selected genre, platform, or game from the Treemap. The two visualizations will be dynamically linked: clicking a rectangle in the Treemap updates the Line Chart with relevant data. Tooltips will provide additional details for both visualizations, and smooth transitions will enhance the interactivity. The dashboard will allow users to explore and compare insights across various gaming categories seamlessly.

##To complete the assignment

- Clone this code template to your local machine.
- Start a local server and open the `index.html` page.
- Modify the given code according to the instructions below to achieve the requested interface.
- Commit and push the code back to this repository to submit it.

## Step 0: Starting code

When you first run the page, you should see a blank dashboard with two panels. Add your name and email to the top, and then create a Javascript file to contain all your JS/D3 logic. You should name the file using your ASURITE. For example, Dr. Bryan's JS file would be named `cbryan16.js`. Link to this file in your index.html.

## Step 1: Displaying a treemap chart

When the page first loads, the left panel should be empty. After the dataset is loaded, you should display a treemap in the left panel showing the hierarchical distribution of games by genre, platform, and title. The size of each rectangle will represent the total number of owners for that game, platform, or genre.

-First, preprocess the dataset to organize it into a hierarchical structure:
    Group by Genres (e.g., Action, RPG) at the top level.
    Group by Platforms (e.g., Windows, Mac) at the second level.
    Add Game Titles (e.g., Skyrim, Portal) at the bottom level.
    Calculate the total number of owners for each group to use as the rectangle size.
-Use the d3.treemap() function to lay out the treemap:
    The treemap should fit inside the #treemap_div SVG, with appropriate margins so that it doesn’t overflow or appear too small.
-Assign colors to rectangles based on the Genres using a categorical D3 color scale, such as d3.schemeCategory10. Ensure that colors are visually distinct.
-Add tooltips that display the following information for each rectangle:
    Genre/Platform/Game Title.
    Total number of owners.
-Add interactivity:
    When the user clicks on a rectangle, filter the data and update the Line Chart in the right panel with relevant time-series data.
-Style the treemap:
    Add a 1-pixel black border (stroke-width=1) to each rectangle.
    Add small padding/margins between rectangles for better visual clarity.
    For inspiration, you can reference this D3 Treemap Example and adapt it for D3.js version 7.

## Step 2: Displaying a Line Chart

When the page first loads, the right panel should be empty. After the user clicks on a rectangle in the Treemap, a Line Chart should appear in the right panel, displaying the average playtime trend over time for the selected genre, platform, or game.

-First, preprocess the dataset to extract time-series data:
    Convert the Release_Date column into a JavaScript Date object.
    Group the data by month/year and calculate the average playtime (Average_Playtime) for each group.
    Structure the data as an array of objects in the format: { date: Date, playtime: Number }.
-Use the d3.line() function to create the Line Chart:
    The X-axis should represent time (e.g., months/years).
    The Y-axis should represent average playtime in minutes.
-Style the chart:
    Use a responsive SVG that fits within the #linechart_div container.
    Add axis labels for time (X-axis) and playtime (Y-axis).
    Use a smooth line path with rounded corners.
-Add tooltips to display:
    The exact date and average playtime for a hovered data point.
    Use a div element that follows the mouse cursor and disappears when the mouse moves away.
-Add interactivity:
    Dynamically update the Line Chart when a rectangle in the Treemap is clicked:
        Clear the current chart.
        Filter the dataset to show time-series data for the selected genre, platform, or game.
        Redraw the chart with a smooth transition for the line.
    Update the chart's title dynamically to reflect the selected item (e.g., "Average Playtime for RPG Games").

## Step 3: Add animation to the two charts

-Add smooth transitions for:
    Rectangle resizing in the Treemap when new data is loaded.
    Line Chart updates when switching between selections.
-Use easing functions (e.g., d3.easeCubic) to enhance visual appeal.

## Step 4: Finalize the dashboard

-Add a title above each visualization panel:
    "Game Distribution by Genre, Platform, and Title" for the Treemap.
    "Average Playtime Trend" for the Line Chart.
-Include legends:
    A color-coded legend for the genres in the Treemap.
-Test all interactions:
    Verify that clicking a rectangle in the Treemap updates the Line Chart.
    Ensure tooltips and animations work smoothly.

## Extra Credit

You can receive up to four extra credit points for this assignment. Each bullet point is worth up to two points (depending on quality  of implementation).

-Linked Highlighting:
    Treemap to Line Chart:
    When the user hovers over a rectangle in the Treemap, highlight the corresponding points in the Line Chart that relate to the selected genre, platform, or game.
    For example:
        If hovering over "Action Games" in the Treemap, the related line in the Line Chart for "Action" would be highlighted.
        If hovering over a platform or game, the chart points specific to that selection will be highlighted.
    Line Chart to Treemap:
        When the user hovers over a point in the Line Chart:
        Highlight the corresponding rectangle in the Treemap that relates to the genre, platform, or game.

-Drill-Down in Treemap:
    Enable double-clicking on a rectangle to zoom into its subtree.
    Add a "Back" button to reset the view.

## Grading

This assignment is worth 10 points. 

- Step 0 is worth 1 point
- Step 1 is worth 3 points
- Step 2 is worth 3 points
- Step 3 is worth 3 points
- The Extra Credit is worth up to 4 bonus points
