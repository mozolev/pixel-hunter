import AbstractView from '../utils/abstract-view';
import {Setting} from '../utils/settings';
import {StateDataType} from '../data/game-data'


enum HeaderViewClassName {
  GAME_TIMER = 'game__timer',
  GAME_TIMER_WARN = 'game__timer--warn',
};

interface HeaderView {
  onBackClick(evt?: Event): void;
}

class HeaderView extends AbstractView {
  readonly _state?: StateDataType;
  private _timeEl: Element;

  constructor(state?: StateDataType) {
    super();

    this._state = state;
  }

  get template() {
    return `<header class="header">
      <button class="back">
        <span class="visually-hidden">Вернуться к началу</span>
        <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
          <use xlink:href="img/sprite.svg#arrow-left"></use>
        </svg>
        <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
          <use xlink:href="img/sprite.svg#logo-small"></use>
        </svg>
      </button>
      ${this._state ? `<div class="${HeaderViewClassName.GAME_TIMER}">${this._state.time}</div>
        <div class="game__lives">
          ${new Array(Setting.MAX_LIVES - this._state.lives).fill(`<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`).join(``)}
          ${new Array(this._state.lives).fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`).join(``)}
        </div>` : ``}
    </header>`;
  }

  bind() {
    this._timeEl = <Element> this.element.querySelector(`.${HeaderViewClassName.GAME_TIMER}`);
    const backBtn = <Element> this.element.querySelector(`.back`);
    backBtn.addEventListener(`click`, () => {
      this.onBackClick();
    });
  }

  public setTime(time: number) {
    this._timeEl.innerHTML = time.toString();
  }

  public setTimeWarnAnimation() {
    this._timeEl.classList.add(HeaderViewClassName.GAME_TIMER_WARN);
  }
}

export default HeaderView;
