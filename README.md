# osu!mapping Elo Rating
[![license:MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## What is osu!mapping Elo rating?

osu!mapping Elo rating is an evaluation indicator based on the [Elo rating system](https://en.wikipedia.org/wiki/Elo_rating_system) to assess osu! mappers' skill by analysing the results of convincing mapping contests.

## How to check a mapper's Elo rating?

## How much can a contest affect Elo rating?

To be included in the Elo system, contests must meet these rules:
* Open access of information. (Everyone can check the information of this contest, including the hosts, judges, participants, detailed results)
* Not an Aspire contest. (Judging should be under the Ranking Criteria)
* Have a certain amount of judges, including some (Ex-) BN/QATs. (To keep a high level of judging)
* The result is not based on the community votes.
* Other general rules for fair play.

According to the composition of the judges who finish scoring at last and other conditions, we divide contests into four classes (dans):
- D1: 4 or more judges, including 2 or more (Ex-) BN/QATs. 
- D2: 4 or more judges, including 2 or more (Ex-) BN/QATs.
- D3: 5 or more judges, including 3 or more (Ex-) BN/QATs.
- D4: 6 or more judges, including 4 or more (Ex-) BN/QATs.

* D1 is prepared for some test-like competition that only acquires participants to map a short track less than 1 minute, or to do part works like hitsounding or placing notes with certain rhythm. As for now, all existed contests are D2/D3/D4.

Contest management and judging must be fair. Issues like unreasonable scoring will cause the contest to be disqualified from system or get dan penalty.

Dan of the contest affect the K-factor in the Elo system. In a D1/D2/D3/D4 contest, the maximum ratings change is a little less than 100/200/300/400 points with infinite participants.
- Generally speaking, the more people who participate in the competition, the higher ratings winner will increase.

If a contest contains 2 or more tracks, each track will be considered as a single event.
- Exceptions: If a contest acquires mapping all the tracks that hosts provided, it is still considered as a single one. Besides, this contest may have +1 dan bonus if not a D4 one because mapping multiple tracks may demonstrate mappers' level more effectively.

## Features

* Calculate a mapper's Elo, starting at ratings of 1200. It increases or decreases depending on the outcome of convincing contests.
  * Here is the contest list: (updated: 4/15/2018)
    * Monthly Beatmap Contest #3, #4, #5, #8, #12
    * Pending Cup #1, #2, #3, #4, #5
    * Newspaper Cup #1, #2, #3*, #4
    * Modhelp Mapping Contest #1, #2, #3, #3.5*
    * Osu! Japanese Beatmap Contest #1, #2
  * Contests with team competition don't affect Elo rating in this version, we will fix that later.
- Elo ranking shows "unranked" when never participate in contests before, shows "inactive" when not compete in 15 months.

### In the future

* Show the realtime, yearly best, all-time best Elo rating.
* Website to show ranking.

## Changelog

### 0.1.0

First released version.
