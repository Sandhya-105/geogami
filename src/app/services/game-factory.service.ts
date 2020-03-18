import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';

import { Game } from "./../models/game";

@Injectable({
  providedIn: "root"
})
export class GameFactoryService {
  public game: Game;

  constructor(private storage: Storage) { }

  addGameInformation(data: any) {
    this.game = {
      ...this.game,
      ...data
    };
    console.log("New Game: ", this.game);
    this.storage.set('game', this.game);
  }

  addTask(task: any) {
    // console.log(task, index);
    if (this.game.hasOwnProperty("tasks")) {
      // const newTaskArr = this.game.tasks;
      // newTaskArr.splice(index, 0, task);
      // console.log(newTaskArr);
      this.game.tasks.push(task);
    } else {
      this.game = {
        ...this.game,
        tasks: [task]
      };
    }
    this.storage.set('game', this.game);
  }

  removeTask(taskID: number) {
    this.game.tasks = this.game.tasks.filter(t => t.id != taskID);
    this.storage.set('game', this.game);
    return this.game;
  }

  applyReorder(tasks) {
    this.game.tasks = tasks
    this.storage.set('game', this.game);
  }

  async getGame(): Promise<Game> {
    return this.storage.get('game').then((val) => {
      console.log(val)
      if (val != undefined) {
        this.game = val
      } else if (!this.game) {
        this.game = new Game(Math.floor(Date.now() / 1000), "", true, []);
        this.storage.set('game', this.game);
      }
      return this.game;
    });
  }

  flushGame() {
    this.game = undefined;
    this.storage.remove('game');
  }
}
