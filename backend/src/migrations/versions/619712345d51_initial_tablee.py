"""Initial tablee

Revision ID: 619712345d51
Revises: e2ddeb447b56
Create Date: 2024-05-20 18:02:07.367307

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '619712345d51'
down_revision = 'e2ddeb447b56'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('companies',
    sa.Column('company_id', sa.Integer(), nullable=False),
    sa.Column('company_name', sa.String(), nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('password', sa.String(length=60), nullable=False),
    sa.PrimaryKeyConstraint('company_id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('tests',
    sa.Column('test_id', sa.Integer(), nullable=False),
    sa.Column('test_name', sa.String(), server_default='Без названия', nullable=False),
    sa.Column('company_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['company_id'], ['companies.company_id'], ),
    sa.PrimaryKeyConstraint('test_id')
    )
    op.create_table('questions',
    sa.Column('question_id', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.Column('answer', sa.String(), nullable=False),
    sa.Column('test_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['test_id'], ['tests.test_id'], ),
    sa.PrimaryKeyConstraint('question_id')
    )
    op.create_table('scores',
    sa.Column('score_id', sa.Integer(), nullable=False),
    sa.Column('score', sa.Float(), nullable=False),
    sa.Column('candidate_name', sa.String(), nullable=False),
    sa.Column('media_contact', sa.String(), nullable=False),
    sa.Column('date', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
    sa.Column('test_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['test_id'], ['tests.test_id'], ),
    sa.PrimaryKeyConstraint('score_id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('scores')
    op.drop_table('questions')
    op.drop_table('tests')
    op.drop_table('companies')
    # ### end Alembic commands ###
