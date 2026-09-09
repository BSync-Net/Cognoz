export const cardList = new Map();

export class Card {

    #id = null;
    #title = null;
    #cache = null;

    constructor(id) {

        if (!id || typeof id !== "string")
            throw new TypeError("CardManager: Expected a valid card id.");

        // Cannot use duplicate IDs for cards
        if (cardList.has(id)) return cardList.get(id);

        this.#id = id;
        cardList.set(id, this);

        this.dataList = [];
        this._dataMap = new Map();
    }

    setTitle(title) {
        this.#title = String(title);
        this.#cache = null; // Updating the card resets the cache
        return this;
    }

    add() {
        
    }

    addDataItem(name, label, value = null) {
        if (!name) return;
        // Cannot use duplicate names for items
        if (this._dataMap.get(name))
            throw new Error("CardManager: Provided name is already in use.")

        const item = { name, label, value };
        this._dataMap.set(name, item)
        this.dataList.push(item);
        this.#cache = null; // Updating the card resets the cache
        return this;
    }

    load() {
        if (this.#cache) return this.#cache; //Reuse previously constructed UI

        const cardUI = document.createElement("div");
        const label = document.createElement("div");

        cardUI.classList.add("card", this.#id);
        cardUI.id = this.#id;
        label.className = "label";
        label.textContent = this.#title;

        cardUI.appendChild(label);

        for (const item of this.dataList) {
            const _wrapper = document.createElement("div");
            const _label = document.createElement("span");
            const _value = document.createElement("span");

            _wrapper.className = "data";
            _label.className = "data-label";
            _value.className = "data-value";

            _label.textContent = item.label;
            _value.textContent = item.value;
            this._bindData(item.name, _value);

            _wrapper.appendChild(_label);
            _wrapper.appendChild(_value);
            cardUI.appendChild(_wrapper);
        }
        
        this.#cache = cardUI;
        return cardUI;
    }

    _bindData(name, UI_value) {
        const dataItem = this._dataMap.get(name);

        if (!dataItem) return;

        let value = dataItem.value;

        Object.defineProperty(dataItem, "value", {
            configurable: true,

            get() {
                return value;
            },

            set(newValue) {
                value = newValue;
                UI_value.textContent = String(newValue);
            }
        });
    }

    setData(name, value) {
        this._dataMap.get(name).value = value;
        return this;
    }



}