class Api::V1::CardDraftsController < ApplicationController

    protect_from_forgery unless: -> { request.format.json? }

    def index
        card_draft = CardDraft.all
        render json: card_draft
    end

    def create
        card_draft = CardDraft.create!(card_draft_params)
        if card_draft
            render json: card_draft
        else 
            render json: card_draft.errors
        end
    end

    def update
        card_draft = CardDraft.find(params[:id])
        if card_draft.update_attributes(card_draft_params)
            render json: card_draft
        else
            render json: card_draft.errors, status: :unprocessable_entity
        end
    end

    private

    def card_draft_params
        params.require(:card_draft).permit(:content)
    end
    
end
