-- Insert data into the teams table
INSERT INTO
    teams (name, country, external_id)
VALUES (
        'Manchester United',
        'England',
        33
    ),
    ('Real Madrid', 'Spain', 541),
    ('FC Barcelona', 'Spain', 529),
    (
        'Bayern Munich',
        'Germany',
        157
    );

-- Insert data into the keywords table
INSERT INTO
    keywords (word)
VALUES ('Man Utd'),
    ('MUFC'),
    ('Red Devils'),
    ('Real Madrid'),
    ('RMCF'),
    ('Los Blancos'),
    ('Barcelona'),
    ('Barça'),
    ('FCB'),
    ('Bayern Munich'),
    ('Bayern');

-- Insert data into the team_keywords table
-- For simplicity, let's assume each team is associated with all of its own keywords
INSERT INTO
    team_keywords (team_id, keyword_id)
VALUES (33, 1),
    (33, 2),
    (33, 3),
    (541, 4),
    (541, 5),
    (541, 6),
    (529, 7),
    (529, 8),
    (529, 9),
    (157, 10),
    (157, 11);

-- Insert data into the user_teams table
-- Let's assume user 1 blocks Manchester United and FC Barcelona
INSERT INTO
    user_teams (user_id, team_id, is_blocked)
VALUES (10, 33, true),
    (10, 529, true);