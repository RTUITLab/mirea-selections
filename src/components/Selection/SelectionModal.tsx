import { VoteButton } from "../VoteButton/VoteButton";

interface SelectionModalProps {
	onCloseModal: () => void;
}

export function SelectionModal({
    onCloseModal
}: SelectionModalProps) {
    return (
        <div style={{ height: '100vh', width: '100vw', position: 'absolute', background: '#000000a1', zIndex: 1000, display: 'flex' }}>
            <div style={{
                background: 'white',
                width: '100%',
                maxWidth: '600px',
                margin: 'auto',
                padding: '18px 32px',
                borderRadius: '16px',
                gap: '12px',
                display: 'grid'
            }}>
                <div style={{
                    fontFamily: '"Adderley", sans-serif',
                    color: '#efb134',
                    fontSize: '36px'
                }}>Внимание</div>
                <div>Для завершения процесса голосования и сохранения вашего выбора необходимо проголосовать во второй номинации.</div>
                <VoteButton location={'selection'} onVoteClick={() => onCloseModal()} buttonText={'Продолжить'}></VoteButton>
            </div>
        </div>
    )
}
