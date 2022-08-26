import { LoggerService as LS } from '@nestjs/common';
import winston, { createLogger, Logger, transports } from 'winston';
import * as logform from 'logform';

export class LoggerService implements LS {

	private logger: Logger;
	private fileName?: string = "LogsApp";
	private context?: string = "Default";	
	private currentDate: Date;	
    

	constructor(context?: string,fileName?: string) {
		if(context) this.context = context;		
		if(fileName) this.fileName = fileName;		
		this.currentDate = new Date(Date.now());
        this.logger = createLogger({
            format: logform.format.combine(
              logform.format.label({ label: this.context }),
              logform.format.timestamp(),
              logform.format.printf(nfo => {
                return `${nfo.timestamp} [${nfo.label}] ${nfo.level}: ${nfo.message}`;
              })
            ),
            transports: [
                new transports.Console(),
                new transports.File({ filename: `${this.fileName}-${this.currentDate.getFullYear()}_${this.currentDate.getMonth()+1}_${this.currentDate.getDate()}.log` })
            ]
          });

		console.log = (message: any, params?: any) => {
			this.logger.debug(message, params);
		};
	}

	log(message: string) {
		this.logger.info(message);
	}
	error(message: string, trace: string) {
		this.logger.error(message, trace);
	}
	warn(message: string) {
		this.logger.warning(message);
	}
	debug(message: string) {
		this.logger.debug(message);
	}
	verbose(message: string) {
		this.logger.verbose(message);
	}
}