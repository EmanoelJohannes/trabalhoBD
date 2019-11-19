-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema trabalhobd
-- -----------------------------------------------------
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`airports`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`airports` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` TEXT(150) NOT NULL,
  `estate` VARCHAR(45) NOT NULL,
  `city` TEXT(150) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`tickets`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`tickets` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `flight_id` INT NOT NULL,
  `passenger_id` INT NOT NULL,
  `date` DATE NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`passengers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`passengers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NULL,
  `age` INT NOT NULL,
  `tickets_id` INT NOT NULL,
  PRIMARY KEY (`id`, `tickets_id`),
  INDEX `fk_passengers_tickets1_idx` (`tickets_id` ASC) VISIBLE,
  CONSTRAINT `fk_passengers_tickets1`
    FOREIGN KEY (`tickets_id`)
    REFERENCES `mydb`.`tickets` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`flights`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`flights` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `aircraft_id` INT NOT NULL,
  `departure_id` INT NOT NULL,
  `destination_id` INT NOT NULL,
  `duration` FLOAT NOT NULL,
  `date` DATE NOT NULL,
  `flightscol` DATE NULL,
  `status` TINYINT NOT NULL DEFAULT 1,
  `airports_id` INT NOT NULL,
  `passengers_id` INT NOT NULL,
  `passengers_tickets_id` INT NOT NULL,
  PRIMARY KEY (`id`, `airports_id`, `passengers_id`, `passengers_tickets_id`),
  INDEX `fk_flights_airports_idx` (`airports_id` ASC) VISIBLE,
  INDEX `fk_flights_passengers1_idx` (`passengers_id` ASC, `passengers_tickets_id` ASC) VISIBLE,
  CONSTRAINT `fk_flights_airports`
    FOREIGN KEY (`airports_id`)
    REFERENCES `mydb`.`airports` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_flights_passengers1`
    FOREIGN KEY (`passengers_id` , `passengers_tickets_id`)
    REFERENCES `mydb`.`passengers` (`id` , `tickets_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`aircrafts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`aircrafts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `year` VARCHAR(45) NULL,
  `status` TINYINT NOT NULL DEFAULT 1,
  `flights_id` INT NOT NULL,
  `flights_airports_id` INT NOT NULL,
  PRIMARY KEY (`id`, `flights_id`, `flights_airports_id`),
  INDEX `fk_aircrafts_flights1_idx` (`flights_id` ASC, `flights_airports_id` ASC) VISIBLE,
  CONSTRAINT `fk_aircrafts_flights1`
    FOREIGN KEY (`flights_id` , `flights_airports_id`)
    REFERENCES `mydb`.`flights` (`id` , `airports_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;