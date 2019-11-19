-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema trabalho_bd
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema trabalho_bd
-- -----------------------------------------------------
CREATE DATABASE IF NOT EXISTS `trabalho_bd` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema trabalhobd
-- -----------------------------------------------------
USE `trabalho_bd` ;

-- -----------------------------------------------------
-- Table `trabalho_bd`.`airports`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `trabalho_bd`.`airports` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` TEXT(150) NOT NULL,
  `estate` VARCHAR(45) NOT NULL,
  `city` TEXT(150) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trabalho_bd`.`tickets`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `trabalho_bd`.`tickets` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `flight_id` INT NOT NULL,
  `passenger_id` INT NOT NULL,
  `date` DATE NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trabalho_bd`.`passengers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `trabalho_bd`.`passengers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NULL,
  `age` INT NOT NULL,
  `tickets_id` INT NOT NULL,
  PRIMARY KEY (`id`, `tickets_id`),
  INDEX `fk_passengers_tickets1_idx` (`tickets_id` ASC),
  CONSTRAINT `fk_passengers_tickets1`
    FOREIGN KEY (`tickets_id`)
    REFERENCES `trabalho_bd`.`tickets` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trabalho_bd`.`flights`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `trabalho_bd`.`flights` (
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
  INDEX `fk_flights_airports_idx` (`airports_id` ASC) ,
  INDEX `fk_flights_passengers1_idx` (`passengers_id` ASC, `passengers_tickets_id` ASC),
  CONSTRAINT `fk_flights_airports`
    FOREIGN KEY (`airports_id`)
    REFERENCES `trabalho_bd`.`airports` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_flights_passengers1`
    FOREIGN KEY (`passengers_id` , `passengers_tickets_id`)
    REFERENCES `trabalho_bd`.`passengers` (`id` , `tickets_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trabalho_bd`.`aircrafts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `trabalho_bd`.`aircrafts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `year` VARCHAR(45) NULL,
  `status` TINYINT NOT NULL DEFAULT 1,
  `flights_id` INT NOT NULL,
  `flights_airports_id` INT NOT NULL,
  PRIMARY KEY (`id`, `flights_id`, `flights_airports_id`),
  INDEX `fk_aircrafts_flights1_idx` (`flights_id` ASC, `flights_airports_id` ASC),
  CONSTRAINT `fk_aircrafts_flights1`
    FOREIGN KEY (`flights_id` , `flights_airports_id`)
    REFERENCES `trabalho_bd`.`flights` (`id` , `airports_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;