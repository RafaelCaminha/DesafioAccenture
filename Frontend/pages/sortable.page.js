const seletorItens = "#sortableContainer .vertical-list-container .list-group-item";

class SortablePage {
  abrirLista() {
    return cy.get("#demo-tab-list").click();
  }

  itens() {
    return cy.get(seletorItens);
  }

  arrastarParaPosicao(nome, posicao) {
    return this.itens().then((itens) => {
      const origem = [...itens].findIndex((item) => item.textContent.trim() === nome);
      if (origem === posicao) return;
      const destino = itens[posicao].getBoundingClientRect();
      const inicio = itens[origem].getBoundingClientRect();
      const janela = itens[origem].ownerDocument.defaultView;
      const dataTransfer = new janela.DataTransfer();
      const coordenadas = {
        clientX: destino.left + destino.width / 2,
        clientY: destino.top + destino.height * (origem < posicao ? 0.75 : 0.25),
      };
      const evento = { eventConstructor: "DragEvent", dataTransfer, bubbles: true };

      cy.wrap(itens[origem]).trigger("dragstart", {
        ...evento,
        clientX: inicio.left + inicio.width / 2,
        clientY: inicio.top + inicio.height / 2,
      });
      this.itens().eq(posicao).trigger("dragenter", { ...evento, ...coordenadas });
      this.itens().eq(posicao).trigger("dragover", { ...evento, ...coordenadas });
      // Aguardar a renderização da nova posição antes de soltar o item.
      this.itens().eq(posicao).should("have.text", nome);
      cy.get("#sortableContainer .vertical-list-container").trigger("drop", {
        ...evento,
        ...coordenadas,
      });
      return this.itens().eq(posicao).trigger("dragend", evento);
    });
  }

  ordenar(ordem) {
    return cy.wrap(ordem, { log: false }).each((nome, posicao) => {
      return this.arrastarParaPosicao(nome, posicao);
    });
  }
}

module.exports = new SortablePage();
