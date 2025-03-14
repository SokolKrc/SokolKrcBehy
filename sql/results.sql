CREATE TABLE results (
    result_id            SERIAL PRIMARY KEY,
    race_id              INT NOT NULL,
    runner_id            INT NOT NULL,
    category             VARCHAR(50),
    start_number         INT,
    achieved_time        VARCHAR(8),
    position_total       INT,
    position_in_category INT,
    
    CONSTRAINT fk_race
        FOREIGN KEY (race_id) 
        REFERENCES races(race_id)
        ON DELETE CASCADE,
        
    CONSTRAINT fk_runner
        FOREIGN KEY (runner_id) 
        REFERENCES runners(runner_id)
        ON DELETE CASCADE
);

CREATE INDEX idx_results_race_id ON results(race_id);
CREATE INDEX idx_results_runner_id ON results(runner_id);
