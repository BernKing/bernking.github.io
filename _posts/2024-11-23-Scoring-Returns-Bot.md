---
layout: post
title: "Scoring Returns Bot"
date: 2024-11-23
categories: [discord bot, football bot]
banner_img: "/assets/images/banner_scoring.png"
description: "A Discord bot that tracks live football games, providing real-time updates and statistics."
---

<style>
.post-content a {
  text-decoration: underline;
}
</style>

# Introduction

The following blog post describes the process of creating a Discord bot that tracks live games between two teams in more than 75 leagues. The bot is open source and easily customizable.

## Main Commands

The **3 main commands** are:

1. **/next_game**: Getting the date of the next game of a chosen team.
2. **/follow**: Following a live game, showing live statistics updated every minute, such as time elapsed, game status, goals, halftime goals, corner kicks, shots on goal, ball possession, and much more. This also sends live notifications of events such as goals, VAR decisions, and red/yellow cards.
3. **/current_games**: Allows users to see what and how many games they are following.

## User Capabilities

The bot can be used by _n_ users, and each user can be following _n_ games. Users can see what and how many games they are following. The owner of the bot can also change the number of games that each user can use at the same time.

## API Used

Also, the code handles the process of retrieving the data from the chosen API, which is [Football API](https://www.api-football.com/).

> **Note:** I am in no way associated or affiliated with it. At the time, I just found it as the easiest and most cost-effective API in the market (this project was developed between February and March of 2024).

## Blog Post Structure

This blog post will be split into two parts:

1. An initial part for users who just want to know how they can use the bot by themselves.
2. A second part where I will dive into a more technical analysis of the implementation.

For non-programmers, I also made an executable that allows users to do the same things they would do with the code manually: set up the bot, keys, configs, leagues, and start and stop the bot.

> **Note:** [Executable and How to Use It](#executable-and-how-to-use-it) on how to use the executable and [Technical Analysis](#technical-analysis) on the technical analysis of the implementation.

## Objective of the Bot

The main objective of the bot was always to solve a problem that I saw while trying to find a football bot for Discord: they all seem too hard to learn how to use, they're not open source, and they are ugly and not customizable. **Scoring Returns Bot** solves all those problems with its easy setup, easy commands, and easy-to-understand messages, featuring beautiful formatting and clarity.

## Reference Images

Prints below for reference:

**Main Message** that is updated during the full duration of the game.
![Main Message](/assets/images/MainMessage.png)

**Event Announcement** example.

![Event Message](/assets/images/Event.png)



 **Full Stats** view after clicking the button in the main message.
 
 ![Full Stats Message](/assets/images/FullStats.png)

---

# Executable and How to Use It

The executable can be downloaded from GitHub releases. All the code used to make it work, including the build code and definitions, is public, which makes everything safer. To get the bot running, you need to follow these steps:

1. **Run the executable.**

2. When opened, you'll see **three tabs** at the top: **Environment Variables**, **Setup**, and **Bot Control**.

   First, you need to set up the **Environment Variables** tab. Here, you need to insert your Discord token and the Football API key. There are already good tutorials on how to get both, which I quote below:
   
	- **Discord token**: For a video tutorial on creating a bot and obtaining its key, watch this [YouTube video](https://www.youtube.com/watch?v=Oy5HGvrxM4o) from 0:00 to 1:50.
	- **Football API key**: Visit [API-FOOTBALL](https://www.api-football.com/). Just sign up and get your key from the Account section in the sidebar, then the **My Access** tab. The key is present next to the **API-KEY** field.

	After the key setup, you can configure additional settings such as:

	- **Footer Icon URL**: URL for the icon shown in the footer of bot messages (accepts image hosting URLs like Imgur or other links to images hosted on the web).
	- **Thumbnail Logo URL**: URL for the thumbnail image shown in bot messages (accepts image hosting URLs like Imgur or other links to images hosted on the web).
	- **Embed Color**: Hex color code for the sidebar color of bot messages (default: `5763719`).
	- **Footer Text**: Custom text shown at the bottom of bot messages (default: "Scoring Returns").
	- **Website Name**: Name of your website shown in bot references (default: "BernKing Blog").
	- **Website URL**: URL to your website shown in bot references.
	- **Max Simultaneous Games**: Maximum number of games a single user can follow at once (default: `3`).
	- **Loop Wait Time**: Time in seconds between each update check for live games (default: `45`).


	These settings can be adjusted at any time through the **Environment Variables** tab of the executable. Lower loop wait times mean more frequent updates but higher API usage. The embed color accepts any valid hex color code to match your server's theme.
	
	After configuring all the variables, click **"Fetch Available Leagues"** to choose from over 91 leagues. Note that selecting more leagues increases API calls, which could exceed your limit.
	
	Now, you'll need to select which leagues you want to track. The league selection interface allows you to choose from a comprehensive list of football leagues worldwide. Only games from selected leagues will be available for tracking—users won't be able to follow teams or matches from leagues that aren't enabled here. This helps optimize API usage and keeps the bot focused on the competitions that matter to your community.

	You can enable or disable leagues at any time, but note that disabling a league will stop tracking of any active games from that competition. The search bar at the top helps you quickly find specific leagues in the list.

3. After configuring the environment variables and selecting leagues, you'll need to complete the setup process through the **Setup** tab. This involves three sequential steps:

	1. **Setup Directories**: Click **"Setup Directories"** first. This creates all necessary folders for storing bot data, league data, and logs.
	    
	2. **Check League Status**: After directories are created, click **"Check League Status"**. This pulls current information about teams, fixtures, and standings for all selected leagues from the API.
	    
	3. **Check Current Setup Status**: Finally, click this to verify everything is properly configured. This validates your:
	    
	    - Directory structure
	    - League data
	    - Configuration files
	
	The status check will show green checkmarks for properly configured items and red X's for anything that needs attention. Fix any issues before starting the bot.

   > ⚠️ **Always run these steps in order (1 → 2 → 3) when setting up for the first time or after making changes to league selections.**

4. Once setup is complete, head to the **Bot Control** tab where you can:
   - Click **"Start Bot"** to launch the bot.
   - Click **"Stop Bot"** to shut it down.

   > ⚠️ **Before starting, ensure you've:**
   > - Created your Discord application and bot in the [Discord Developer Portal](https://discord.com/developers/applications).
   > - Generated a valid bot token.
   > - Invited the bot to your server with proper permissions (Send Messages, Embed Links, Read Message History).
   > - Completed all setup steps in order.

   The bot will start listening for commands once launched. If you need to make any configuration changes later, stop the bot first, make your changes, and restart it.

If you have any questions or need help, feel free to reach out:

- X (Twitter): [@bernKing20](https://x.com/bernKing20)
- Email: [bernardoalmeida2004@gmail.com](mailto:bernardoalmeida2004@gmail.com)

---

# Technical Analysis

## Introduction to the Analysis

In this part, I will dive into the technical aspects of the code. Even though I won't go through every function in detail, I will provide an overview of the functionalities and the flow of the code.

This project originated from something different. A friend and I wanted to explore a different way of football betting through extensive data analysis of previous games. While exploring this topic and trying to find a way to do it, I knew I needed two main things: a way to get the data and a way to process it.

After some research, I found the [API-Football](https://www.api-football.com/), which seemed the best option given the price, the data available, and the extensive documentation it provided.

After that, I decided to build a program that grabs extensive data about all the games of a chosen league and then processes it to find patterns and trends. This brought us to the next stage, which was how we would show this data to the end user. After some thought, we decided that Discord was a good platform to do it (looking back at it now, it wasn't the best choice, and launching a dedicated platform for it would have been better, but it was still a fun project and led me to the creation of this bot anyway).

With this data, we would propose bets, and this is where the bot came into play. I decided to create a bot that would be able to follow the bets in real time based on the live game. While I decided not to make that version of the bot public (at least for now), during the process of creating it and preparing the Discord, I decided to create a branch of it that doesn't have any relation to the betting side and only follows the games in real time, which is the version you can see here. This version of the bot was used in three different Discord servers at the time and was well accepted in the communities where it was. Sadly, we shut down the project, but now I have decided to resurrect it and make it public and open source for anyone to use, since I hope it solves the problem I was also facing, which was finding a simple, direct, and beautiful bot that shows live football game stats.

## Pycord Choice

In the process of starting to make the bot, I found it a bit hard to decide which Python Discord library to use; there were so many different ones but so similar at the same time, so it was a bit confusing. I decided to stick with [Pycord](https://github.com/Pycord-Development/pycord), which is "a modern, easy to use, feature-rich, and async ready API wrapper for Discord written in Python". I found Pycord really easy to use, and the documentation was really good, especially this [guide](https://guide.pycord.dev/introduction) that covers all the basics and more advanced things needed to build a fully functional Discord bot.
## Config Folder

Before starting to code, there is the `/configs` folder that contains the `config.py` file, which is used to store all the configuration variables of the bot. These variables are used throughout the code to ensure consistency and ease of modification. These variables are read from the environment variables defined in an `.env` file in the root of the project. Everything is handled by the `dotenv` library, and everything is customizable by the user. There is an `.env.example` file in the root of the project that shows all the variables that need to be defined.

## Executable Creation

Later, for non-tech-savvy users, I made an executable that automates the setup process of the bot. You can find it in the releases tab of the GitHub repository; it is based on the `executable.py` file present in the root of the project. I won't go into detail of its implementation since it's just putting everything together in a GUI-based file and then building it into an executable with `executable.spec`. If you want to build the executable yourself, just go into the root of the project and type `pyinstaller executable.spec`, and the new `dist` folder with the executable and build folders will be created. This is how I built the executable present in the releases tab. Another note, since it uses PyInstaller and the process is quite heavy, the executable does take some time to load up.

## Code and Flow Analysis

### Leagues Data Setup `/scripts`

The bot is divided into **three main parts**. The first part is inside the `/scripts` directory, where you find `league_status_checker.py` and `setup_directories.py`. This part handles the extraction and organization of data from the API. The needed data starts with the league status information, which includes details about all available leagues on the API and their current seasons. This data serves as the foundation for identifying which leagues have stats and events covered in real time.

From there, the function `get_fixtures_file(...)` gets detailed fixtures data for each selected league. These fixtures contain match information including dates, teams, and match status. This data is crucial for tracking both upcoming and live matches, providing the bot with the necessary information to monitor and know the schedules of the games.

Lastly, `get_league_standings(...)` downloads standings data for specified leagues. The main purpose of this data is to feed the bot with the teams' names and IDs, which are then used to populate the command data and the choices the user has when they want to follow a game.

All this data is organized and stored in JSON format since this is the way the API returns it, and it is easier to manipulate. Each league has a separate file for fixtures and standings.

### Helper Files `/common_utils`

The second part of the code is inside `/common_utils` and contains functions that are used in multiple files. This is where the functions that format the data into embeds and banners are located. There are three different files here: `banner_formatter.py`, `fixture_utils.py`, and `league_utils.py`.

`banner_formatter.py` is used in the main bot flow to format the two logos of the teams and the "vs" image present in the `assets/images` folder into a single banner image that is then used in the embeds.

![Banner Example](/assets/images/LeganesvsRealMadrid.png)


`fixture_utils.py` has two functions that are used again in the main bot flow. The first one is `get_thread_embed(...)`, which is used to format the fixture data into an embed that is then sent as the first message to the Discord channel. The second one is `get_team_names_from_fixture(...)`, which is used to get the names of the home and away teams from the fixture data so it can be used later to organize the data in the task manager (which will be explained later).

While in development, I also decided to build a logging system that would be able to log the data of the bot and the game-following functionality for each user. For this, I created the `time_logging.py` file inside the `logging` folder that contains the logs of each user and the bot itself. The `configure_logging(...)` function is used to create and configure a logger for a specific game (`team_name`) and `author_id` (user ID) and returns the logger so it can be used in other files. In the same file, there is also the `calculate_time_remaining(...)` function that calculates the time remaining until the next game of a chosen team starts. This is used in the bot process to check if the game has started yet, log the time remaining until the next game starts, and determine when to make the next call to the API to check for updates.

### Bot Processes `/bot`

Finally, the most crucial part of the code is the bot process. This part is present in the `/bot` folder, and inside it, there are various subfolders and files needed to make the bot work.

#### Classes: TaskManager and  TeamsOrganizer `/utils`

First, let's talk about the `utils` folder. This folder contains two files, `task_manager.py` and `teams_organizer.py`, each of them being a class to help the main process of the bot and to keep the code more organized.

The `task_manager.py` contains the `TaskManager` class, which is used to keep track of the games each user is following. The class has a single attribute, `user_tasks`, which is a dictionary that maps user IDs to tuples of integers and lists. Each tuple contains an integer representing the number of tasks (games) a user is following and a list of strings representing the names of the games. This way, it is easy to keep track of the games each user is following and to add or remove games from the list. The maximum number of games a user can follow is defined by the `MAX_SIMULTANEOUS_GAMES` variable in the `config.py` file.

There are **four main methods** in the class:

- `new_add_task(user_id, game_name)`: This method is used to add a new game to the user's task list. It takes the user's ID and the name of the game as arguments. If the user already has tasks, it appends the game name to the existing list. If not, it initializes a new list with the game name and sets the task count to 1.
- `new_remove_task(user_id, game_name)`: This method is used to remove a game from the user's task list. It takes the user's ID and the name of the game as arguments. It searches for the game name in the user's list of tasks and removes it if found. If the game is the last one, it also removes the list itself.
- `get_task_games_list(user_id)`: This method returns the list of games a user is following.
- `new_get_task_count(user_id)`: This method returns the number of games a user is following.

All these methods are used in the main process of the bot to keep track of the games each user is following and to check the number of games a user is following and what games they are following.

The `teams_organizer.py` file contains the `TeamsOrganizer` class, which is used to organize the data of the teams and fixtures. The class has several attributes:

- `leagues`: A dictionary that maps league names to league IDs.
- `teams_dict`: A dictionary that maps team names to team IDs.
- `football_teams`: A list of all the teams in the local `AllStandings` directory.
- `teams_fixtures_dict`: A dictionary that maps team names to a list of fixtures.
- `fixtures_by_league`: A dictionary that maps league IDs to a list of fixtures.

All the data present in these attributes is extracted and organized from the `league_status_checker.py` file we discussed before. Therefore, the data in these attributes is the same data about the leagues that the user chose to have the bot track to follow.

In the constructor of the class, there are calls to the `load_fixtures()` and `new_load_teams()` methods. The `load_fixtures()` method loads and organizes all fixture data from JSON files by league ID. The `new_load_teams()` method processes team standings and matches them with fixtures.

Then, there are two other main methods used in the main process of the bot:

- `new_find_next_fixture(team_league)`: This method finds the next scheduled fixture for a team. It takes `team_league` as an argument, which is a list containing the team's ID and league ID. It returns the fixture ID and date of the next game. We also add a 4-hour delay to the date; this way, the user has time to react to the game starting and can still see its stats after it has finished.
- `find_team_id(team_name)`: This method retrieves the team ID and league ID for a given team name. It takes `team_name` as an argument and returns a list containing the team's ID and league ID.

#### Button present in the Embeds `/views`

In the `views` folder, there is the `button.py` file, which contains the `Button` class. This class is used to create the buttons that are used in the bot messages containing the live game stats, as seen in the images in the beginning of the blog post.

Our messages need two main buttons: one to show the full stats of the game in a new ephemeral message and one to stop the game from being live followed.

*Note: Ephemeral messages are messages that are only visible to the user that sent them and are defined by the `ephemeral=True` parameter in the `send_message` function.*

To achieve these two functionalities, the class needs to receive and initialize the following attributes:

- `task`: The asyncio task that is running the game monitoring process.
- `author_id`: The ID of the user who initiated the game monitoring.
- `task_manager`: An instance of the `TaskManager` class to manage user tasks.
- `all_stats_dict`: A dictionary to store all the statistics of the game.

The class also has several minimal methods to help handle this data:

- `update_dict(updated_minutes_15_dict)`: Updates the dictionary with the 15-minute analysis data. **Outdated function**
- `update_stats(updated_fixture_json)`: Updates the fixture JSON data.
- `update_all_stats_dict(updated_all_stats_dict)`: Updates the dictionary with all the game statistics.

Then, to define the buttons themselves, we use the following methods: `end_task_button(button, interaction)` and `show_full_stats(button, interaction)`.

* `end_task_button`: This method is used to stop the game from being live followed. It is defined by the `@discord.ui.button` decorator and is a red button with the text "Stop the Game!". When pressed, it checks if the user who pressed it is the same as the one who started it. If not authorized, it sends an ephemeral message indicating so. If authorized, it cancels the task, retrieves the game status, and removes the game from the task manager if the game is not finished. Finally, it sends a confirmation message to the user.

* `show_full_stats`: This method is used to display complete match statistics in a new ephemeral message. It is defined by the `@discord.ui.button` decorator and is a blue button labeled "Show Full Stats". When pressed, it checks for a 60-second cooldown per user, retrieves the full game data from the fixture JSON, and sends an embedded message with the full stats of the game. If the game hasn't started, it notifies the user accordingly. It also updates the last click time for the user to enforce the cooldown.

#### Bot Backend Logic `/services`

In the `services` folder, we have the `bot_backend.py` file, which, as the name suggests, is the backbone of the bot and the most important part of the project—the part where I spent most of my work. This file contains the main process of the bot to follow the games in real time.

The file is divided into **four different functions**, all async functions, with the main function being `only_stats_main(...)` and the other three—`get_fixtures_statistics(...)`, `information_presenter(...)`, and `game_status_func(...)`—being called from inside `only_stats_main(...)`.

* `get_fixtures_statistics(fixture_id)` This function is responsible for retrieving game statistics from the API. It fetches detailed match data, including team names, scores, and various in-game statistics. It processes the API response, organizes the data, and returns it in a structured format. This is the core function called throughout the game-following process to ensure that the data is always up to date.

* `information_presenter(live_stats_dict, bot, previous_size, specific_fixture, task_manager, author_id, announcment_id, logger)`: This function creates and updates Discord embeds with match information and events. It takes the current match statistics, bot instance, previous number of events, raw fixture data, task management instance, Discord user ID, channel ID for announcements, and logger as arguments. The function creates the first embed with the game status and team stats and then updates it with live game stats each time it is called. This prevents spamming the channel with new messages by updating the same stats and original embed message. It also handles game events like goals, VAR decisions, red cards, and penalty shootouts by processing these events and sending a new event embed with the event information.

* `game_status_func(bot, specific_fixture, live_stats_dict, announcment_id, game_moment, logger)`: This function sends game status announcements to specified channels. It takes the bot instance, raw fixture data, current match statistics, channel ID for announcements, current game state, and logger as arguments. It sends events regarding the game status, such as halftime reached, extra time started, penalty shootout started, etc., by sending new embed messages with the game status.

* `only_stats_main(bot, initial_message, fixture_id, author_id, task_manager, previous_attachments, announcment_id, channel_id)`: This core function handles the real-time tracking of match statistics. It utilizes the `get_fixtures_statistics` function to retrieve live data and interacts with the `TaskManager` to manage user-specific tracking tasks. Running as an asyncio task, it ensures non-blocking execution, allowing the bot to handle other commands concurrently while continuously monitoring and updating game stats in the background.

Before the match starts, the function intelligently manages API calls. Instead of checking every minute, it adjusts the check frequency based on how long until kickoff:

- If the game is 10+ hours away, it checks every 10 hours.
- As the game approaches, the frequency increases to every 5 hours, then every hour, then every 30 minutes, and finally every few seconds near kickoff.

The main loop runs at an interval defined by `LOOP_WAIT_TIME`—a user-configurable variable that should align with API rate limits. For example, with a free tier limit of 100 requests per day, setting `LOOP_WAIT_TIME` to 120 seconds would be appropriate. This interval is also used during halftime to maintain consistent API usage.

To handle Discord's occasional hiccups, there's a retry system. When sending messages, if something fails, it tries again up to 3 times before giving up. This helps deal with temporary connection issues or rate limits.

The function also handles different game states like extra time and penalties. When the match ends (FT, AET, PEN, or ABD status), it sends a final update and cleans up.

Throughout the process, it maintains a Discord message with live stats and updates it regularly. If anything goes wrong (like the message being deleted), it logs the error and stops gracefully.

The whole system is built to be reliable while respecting API limits. It's not perfect—sometimes Discord acts up or the API might be slow—but the retry system and variable check intervals help keep things running smoothly most of the time.

Finally, the place where the bot is launched, commands are defined, and the `only_stats_main(...)` function is called is in the `main.py` file.

#### Bot and Commands Creation `main.py`

In this file, we start by checking if all the necessary directories and files are present. Then, we define the bot intents and create the bot instance. Intents are a way to tell Discord what the bot will do and need to be enabled for the bot to function properly.
Next, we initialize the `TeamsOrganizer` and `TaskManager` classes that we discussed earlier and begin defining our commands. As mentioned in the introduction, the main commands we have are `/follow`, `/next_game`, `/current_games`, and `/ping`.

#####  `/ping`

The `/ping` command is straightforward and serves as a simple way to check if the bot is working and online.

##### `/next_game`

The `/next_game` command allows users to check upcoming matches for a specific team. It leverages the `team_autocomplete` function to provide real-time suggestions as users type, filtering through `teams_organizer.football_teams`. When executed, it retrieves the team's ID and league using `teams_organizer.find_team_id()`, then finds the next fixture using `new_find_next_fixture()`. The command formats the date into a European style (`DD/MM/YYYY @ HH:MM`) and creates a Discord embed containing the match details, including both teams and the scheduled time.
#####  `/follow`

The `/follow` command is the core functionality for live match tracking. It first validates the bot's permissions in the channel (`send_messages`, `embed_links`, `attach_files`) and checks if the requested team exists. After validation, it retrieves the fixture information and ensures the user hasn't exceeded `MAX_SIMULTANEOUS_GAMES`. The command creates an initial embed with team logos using `get_thread_embed()`, then launches an asyncio task running `only_stats_main()` which handles the continuous match updates. If an announcements channel ID is provided, match events will be sent there. The task is managed through the `TaskManager` class, which tracks active games per user.
#####  `/current_games`

The `/current_games` command provides users with an overview of their active game subscriptions. It queries the `TaskManager` to get the count of games the user is currently following and calculates the remaining available slots based on `MAX_SIMULTANEOUS_GAMES`. The command generates an embed displaying all active games the user is following, formatted as "Team A vs Team B", along with the total count and available slots for additional games.

The bot's `ready` event sets up a custom presence message ("playing with Football Live Games!") and logs the successful startup. The main execution flow includes error handling and proper bot shutdown procedures through the `close_bot()` function. The `start_bot()` function wraps the `bot.start()` call with error logging to ensure any startup issues are properly captured and reported.

All commands utilize the shared configuration values (`embed_color`, `footer_text`, etc.) to maintain consistent styling across responses and integrate with the logging system to track command usage and potential issues. The bot's modular design allows for easy expansion of commands while maintaining consistent error handling and user feedback patterns.

---

# Conclusion and Acknowledgments

I hope this blog post was clear and easy to follow. Due to the large scope of the project, I couldn't delve into every detail, but I tried to cover the most important parts and, most importantly, the flow of the code. In my opinion, this bot is truly unique, providing comprehensive live game stats and events in a simple and easy-to-understand way. Additionally, it is the first open-source football bot that does this. My [𝕏 (Twitter)](https://x.com/bernking20) DMs are open for any suggestions or comments.

To achieve my final goal, I used external libraries and referenced other people's code. Here they are:

- [Pycord](https://github.com/Pycord-Development/pycord) for the Discord API wrapper.
- [Stack Overflow](https://stackoverflow.com/) for general Python and Discord API questions.
- [Pycord Discord](https://discord.com/invite/pycord) for general Pycord questions—a good and welcoming community.

---

# Disclaimer

This project is not affiliated with API-FOOTBALL. It is a personal project and open source for anyone to use. Make sure you always respect the API-FOOTBALL terms of service, API limits, and Discord rate limits.


#python #discordbot #footballlivebot